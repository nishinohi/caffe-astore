import type { APIRoute } from 'astro'
import { readdir, stat } from 'fs/promises'
import { join } from 'path'

export interface MenuItemData {
  name: string
  nameTranslateJp: string
  description: string
  ingredients: {
    name: string
    description?: string
  }[]
}

export interface MenuItem {
  id: string
  name: string
  image: string
  data?: MenuItemData
}

export interface MenuCategory {
  id: string
  name: string
  items: MenuItem[]
}

// Category name mappings for display
const categoryNames: Record<string, string> = {
  caffe: 'Caffè',
  mocktail: 'Mocktail', 
  cocktail: 'Cocktail',
  dolce: 'Dolce'
}

async function getMenuStructure(): Promise<MenuCategory[]> {
  const menuPath = join(process.cwd(), 'public/assets/menu')
  
  try {
    const categories = await readdir(menuPath)
    const menuCategories: MenuCategory[] = []
    
    for (const categoryId of categories) {
      const categoryPath = join(menuPath, categoryId)
      const categoryStat = await stat(categoryPath)
      
      if (!categoryStat.isDirectory()) continue
      
      const files = await readdir(categoryPath)
      const items: MenuItem[] = []
      
      // Group files by their base name (without extension)
      const fileGroups: Record<string, { image?: string; json?: string }> = {}
      
      for (const file of files) {
        const nameWithoutExt = file.replace(/\.(jpeg|jpg|png|json)$/, '')
        if (!fileGroups[nameWithoutExt]) {
          fileGroups[nameWithoutExt] = {}
        }
        
        if (file.endsWith('.jpeg') || file.endsWith('.jpg') || file.endsWith('.png')) {
          fileGroups[nameWithoutExt].image = file
        } else if (file.endsWith('.json')) {
          fileGroups[nameWithoutExt].json = file
        }
      }
      
      // Create menu items from file groups
      for (const [itemId, group] of Object.entries(fileGroups)) {
        if (group.image) {
          // Create readable name from ID (convert kebab-case to title case)
          const itemName = itemId
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ')
          
          items.push({
            id: itemId,
            name: itemName,
            image: `/caffe-astore/assets/menu/${categoryId}/${group.image}`
          })
        }
      }
      
      // Sort items by name
      items.sort((a, b) => a.name.localeCompare(b.name))
      
      if (items.length > 0) {
        menuCategories.push({
          id: categoryId,
          name: categoryNames[categoryId] || categoryId.charAt(0).toUpperCase() + categoryId.slice(1),
          items
        })
      }
    }
    
    // Sort categories by predefined order
    const categoryOrder = ['caffe', 'mocktail', 'cocktail', 'dolce']
    menuCategories.sort((a, b) => {
      const aIndex = categoryOrder.indexOf(a.id)
      const bIndex = categoryOrder.indexOf(b.id)
      if (aIndex === -1 && bIndex === -1) return a.name.localeCompare(b.name)
      if (aIndex === -1) return 1
      if (bIndex === -1) return -1
      return aIndex - bIndex
    })
    
    return menuCategories
  } catch (error) {
    console.error('Error reading menu structure:', error)
    return []
  }
}

export const GET: APIRoute = async () => {
  try {
    const menuStructure = await getMenuStructure()
    
    return new Response(JSON.stringify(menuStructure), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  } catch (error) {
    console.error('Error in menu-structure API:', error)
    return new Response(JSON.stringify({ error: 'Failed to load menu structure' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
}