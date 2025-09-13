import type { CarouselApi } from '@/components/ui/carousel'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import type { MenuCategory, MenuItemData } from '@/pages/api/menu-structure.json'
import { useEffect, useState } from 'react'

export default function Menu() {
  const [menuCategories, setMenuCategories] = useState<MenuCategory[]>([])
  const [selectedCategory, setSelectedCategory] = useState(0)
  const [selectedItem, setSelectedItem] = useState(0)
  const [menuData, setMenuData] = useState<MenuItemData | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingStructure, setIsLoadingStructure] = useState(true)
  const [api, setApi] = useState<CarouselApi>()

  const currentCategory = menuCategories[selectedCategory]
  const currentItem = currentCategory?.items[selectedItem]

  // Load menu structure on component mount
  useEffect(() => {
    const loadMenuStructure = async () => {
      setIsLoadingStructure(true)
      try {
        const response = await fetch('/caffe-astore/api/menu-structure.json')
        if (response.ok) {
          const categories = await response.json()
          setMenuCategories(categories)
        } else {
          console.error('Failed to load menu structure')
        }
      } catch (error) {
        console.error('Failed to load menu structure:', error)
      } finally {
        setIsLoadingStructure(false)
      }
    }

    loadMenuStructure()
  }, [])

  // Load menu data when selected item changes
  useEffect(() => {
    if (!currentCategory || !currentItem) return

    const loadMenuData = async () => {
      setIsLoading(true)
      try {
        const response = await fetch(`/caffe-astore/assets/menu/${currentCategory.id}/${currentItem.id}.json`)
        if (response.ok) {
          const data = await response.json()
          setMenuData(data)
        } else {
          setMenuData(null)
        }
      } catch (error) {
        console.error('Failed to load menu data:', error)
        setMenuData(null)
      } finally {
        setIsLoading(false)
      }
    }

    loadMenuData()
  }, [currentCategory?.id, currentItem?.id])

  // Handle carousel slide change
  useEffect(() => {
    if (!api) return

    const onSelect = () => {
      setSelectedItem(api.selectedScrollSnap())
    }

    api.on('select', onSelect)
    return () => {
      api.off('select', onSelect)
    }
  }, [api])

  // Reset to first item when category changes
  useEffect(() => {
    setSelectedItem(0)
    if (api) {
      api.scrollTo(0)
    }
  }, [selectedCategory, api])

  const handleCategoryChange = (index: number) => {
    setSelectedCategory(index)
  }

  return (
    <section className="mx-auto min-h-[110vh] max-w-7xl px-4 py-20">
      <div className="mb-16 text-center">
        <h2 className="font-josefin mb-8 text-3xl md:mb-16 md:text-4xl">Menu</h2>
        {isLoadingStructure && (
          <div className="flex justify-center">
            <span className="relative flex size-6">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-neutral-400 opacity-75"></span>
              <p className="sr-only">メニューを準備しています</p>
            </span>
          </div>
        )}
        {menuCategories.length === 0 && (
          <div className="flex justify-center">
            <p className="font-josefin text-muted-foreground">メニューを準備中です</p>
            <p className="sr-only">メニューの読み込みに失敗しました</p>
          </div>
        )}
        <nav aria-label="メニューカテゴリー">
          <div className="flex justify-center space-x-6 md:space-x-12">
            {menuCategories.map((category, index) => (
              <button
                key={category.id}
                onClick={() => handleCategoryChange(index)}
                className={`font-josefin border-b-2 text-lg transition-colors duration-300 md:text-xl lg:text-2xl ${
                  selectedCategory === index ? 'border-foreground' : 'hover:border-foreground border-transparent'
                }`}
                aria-current={selectedCategory === index ? 'true' : 'false'}
              >
                {category.name}
              </button>
            ))}
          </div>
        </nav>
      </div>

      {/* Menu Content */}
      <div className="grid gap-12 md:grid-cols-2 md:items-center">
        {/* Image Carousel */}
        <div className="relative">
          <Carousel
            setApi={setApi}
            className="mx-auto w-full md:max-w-sm lg:max-w-md"
            opts={{
              align: 'start',
              loop: true,
            }}
          >
            <CarouselContent>
              {currentCategory?.items.map((item) => (
                <CarouselItem key={item.id}>
                  <div className="aspect-square overflow-hidden rounded-4xl">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover transition-transform duration-700 hover:scale-103"
                      loading="lazy"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute top-1/2 left-3 hidden h-12 w-12 -translate-y-1/2 border-none bg-white/40 backdrop-blur-sm hover:bg-white/50 md:inline-flex" />
            <CarouselNext className="absolute top-1/2 right-3 hidden h-12 w-12 -translate-y-1/2 border-none bg-white/40 backdrop-blur-sm hover:bg-white/50 md:inline-flex" />
          </Carousel>
          {/* Slide Indicators */}
          <div className="flex justify-center space-x-2 pt-4 md:hidden">
            {currentCategory?.items.map((_, index) => (
              <button
                key={index}
                onClick={() => api?.scrollTo(index)}
                className={`h-2 w-2 rounded-full transition-colors duration-300 ${
                  selectedItem === index ? 'bg-neutral-500' : 'bg-neutral-300 hover:bg-neutral-400'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Description */}
        <div className="flex flex-col space-y-6 py-4 md:h-full lg:space-y-8">
          {/* Title */}
          <header className="space-y-2">
            <h3 className="font-josefin font text-2xl">{menuData?.name}</h3>
            <p className="font-josefin text-base">{menuData?.nameTranslateJp}</p>
          </header>

          {/* Description Content */}
          <div className="relative md:grow">
            {/* Loading State */}
            <div
              className={`absolute inset-0 flex flex-col items-center justify-center space-y-3 transition-opacity duration-500 ${isLoading ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
            >
              <div className="h-6 w-6 animate-pulse rounded-full bg-neutral-500"></div>
              <p className="sr-only">詳細を読み込み中</p>
            </div>

            {/* Content */}
            <div
              className={`flex flex-col space-y-10 transition-opacity duration-500 md:h-full md:justify-between ${isLoading ? 'opacity-0' : 'opacity-100'}`}
            >
              {menuData && (
                <>
                  {/* Main Description */}
                  <p className="leading-loose">{menuData.description}</p>
                  {/* Ingredients */}
                  {menuData.ingredients && menuData.ingredients.length > 0 && (
                    <section className="border-foreground relative rounded-md border pt-5 pr-6 pb-4 pl-8">
                      <h4 className="bg-background absolute -top-3.5 left-4 inline-block px-2 text-base">
                        Ingredients
                      </h4>
                      <ul className="space-y-1.5">
                        {menuData.ingredients.map((ingredient, index) => (
                          <li key={index} className="flex items-center space-x-2">
                            <span className="size-1 flex-shrink-0 rounded-full bg-neutral-600"></span>
                            <span className="text-sm">{ingredient.name}</span>
                            {/* {ingredient.description && <span className="ml-2">- {ingredient.description}</span>} */}
                          </li>
                        ))}
                      </ul>
                    </section>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
