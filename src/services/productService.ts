import { supabase, Product } from '@/lib/supabase'

export class ProductService {
  // Get all products with optional filtering
  static async getProducts(filters?: {
    category?: string
    search?: string
    inStock?: boolean
  }) {
    let query = supabase
      .from('products')
      .select(`
        *,
        categories (name),
        suppliers (name)
      `)
      .eq('active', true)

    if (filters?.category && filters.category !== 'Todos') {
      query = query.eq('categories.name', filters.category)
    }

    if (filters?.search) {
      query = query.or(`name.ilike.%${filters.search}%,description.ilike.%${filters.search}%`)
    }

    if (filters?.inStock) {
      query = query.gt('stock_quantity', 0)
    }

    const { data, error } = await query.order('name')

    if (error) throw error
    return data
  }

  // Get product by ID
  static async getProductById(productId: string) {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        categories (name),
        suppliers (name, contact_info)
      `)
      .eq('id', productId)
      .single()

    if (error) throw error
    return data
  }

  // Update product stock
  static async updateStock(productId: string, quantity: number) {
    const { data, error } = await supabase
      .from('products')
      .update({ stock_quantity: quantity })
      .eq('id', productId)
      .select()
      .single()

    if (error) throw error
    
    // Check if stock is below minimum and create alert
    if (data.stock_quantity <= data.min_stock) {
      await this.createLowStockAlert(productId)
    }

    return data
  }

  // Create low stock alert
  private static async createLowStockAlert(productId: string) {
    // This would typically send notification to admin
    console.log(`Low stock alert for product ${productId}`)
    // Implementation for notification system would go here
  }

  // Get categories
  static async getCategories() {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name')

    if (error) throw error
    return data
  }

  // Search products
  static async searchProducts(searchTerm: string, limit = 10) {
    const { data, error } = await supabase
      .from('products')
      .select('id, name, description, price, stock_quantity')
      .or(`name.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`)
      .eq('active', true)
      .limit(limit)

    if (error) throw error
    return data
  }
}