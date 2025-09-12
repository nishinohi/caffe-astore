import type { CarouselApi } from '@/components/ui/carousel'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { useEffect, useState } from 'react'

interface MenuItemData {
  description: string
  ingredients: {
    name: string
    description?: string
  }[]
}

interface MenuItem {
  id: string
  name: string
  image: string
  data?: MenuItemData
}

interface MenuCategory {
  id: string
  name: string
  items: MenuItem[]
}

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
  const isMenuCategoriesExit = menuCategories.length > 0

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
    <section className="min-h-screen py-20">
      <div className="mx-auto max-w-7xl px-4">
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
          <div className="flex justify-center space-x-6 md:space-x-12">
            {menuCategories.map((category, index) => (
              <button
                key={category.id}
                onClick={() => handleCategoryChange(index)}
                className={`font-josefin border-b-2 text-lg transition-colors duration-300 md:text-xl lg:text-2xl ${
                  selectedCategory === index ? 'border-foreground' : 'hover:border-foreground border-transparent'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Content */}
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          {/* Image Carousel */}
          <div className="relative">
            <Carousel
              setApi={setApi}
              className="mx-auto w-full max-w-md"
              opts={{
                align: 'start',
                loop: true,
              }}
            >
              <CarouselContent>
                {currentCategory?.items.map((item, index) => (
                  <CarouselItem key={item.id}>
                    <div className="aspect-square overflow-hidden rounded-2xl bg-stone-100 shadow-xl">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="absolute top-1/2 left-4 h-12 w-12 -translate-y-1/2 border-2 border-white bg-white/90 shadow-lg backdrop-blur-sm hover:bg-white" />
              <CarouselNext className="absolute top-1/2 right-4 h-12 w-12 -translate-y-1/2 border-2 border-white bg-white/90 shadow-lg backdrop-blur-sm hover:bg-white" />
            </Carousel>
          </div>

          {/* Description */}
          <div className="space-y-6">
            {/* Title */}
            <div className="space-y-2">
              <h3 className="font-josefin text-3xl font-bold">{currentItem?.name}</h3>
              <p className="font-josefin text-lg">{currentItem?.name}</p>
            </div>

            {/* Description Content */}
            <div className={`space-y-6 transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
              {menuData && (
                <>
                  {/* Main Description */}
                  <div className="space-y-4">
                    <p className="leading-relaxed">{menuData.description}</p>
                  </div>

                  {/* Ingredients */}
                  {menuData.ingredients && menuData.ingredients.length > 0 && (
                    <div className="space-y-4">
                      <h4 className="font-medium">材料・特徴</h4>
                      <ul className="space-y-2">
                        {menuData.ingredients.map((ingredient, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-amber-600"></span>
                            <div>
                              <span className="font-medium">{ingredient.name}</span>
                              {ingredient.description && <span className="ml-2">- {ingredient.description}</span>}
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </>
              )}

              {!menuData && !isLoading && (
                <div className="flex flex-col items-center space-y-3 py-6">
                  <div className="h-6 w-6 animate-pulse rounded-full bg-amber-500"></div>
                  <p className="font-josefin text-sm">詳細を読み込み中</p>
                </div>
              )}
            </div>

            {/* Slide Indicators */}
            <div className="flex justify-center space-x-2 pt-4">
              {currentCategory?.items.map((_, index) => (
                <button
                  key={index}
                  onClick={() => api?.scrollTo(index)}
                  className={`h-2 w-2 rounded-full transition-colors duration-300 ${
                    selectedItem === index ? 'bg-amber-600' : 'bg-stone-300 hover:bg-stone-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
