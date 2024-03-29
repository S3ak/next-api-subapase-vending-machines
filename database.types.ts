export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      customers: {
        Row: {
          email: string
          id: string
          name: string
          password: string
          phone: string | null
        }
        Insert: {
          email: string
          id?: string
          name: string
          password: string
          phone?: string | null
        }
        Update: {
          email?: string
          id?: string
          name?: string
          password?: string
          phone?: string | null
        }
        Relationships: []
      }
      products: {
        Row: {
          description: string | null
          id: string
          name: string
          price: number
        }
        Insert: {
          description?: string | null
          id?: string
          name: string
          price: number
        }
        Update: {
          description?: string | null
          id?: string
          name?: string
          price?: number
        }
        Relationships: []
      }
      transactions: {
        Row: {
          customer_id: string | null
          id: string
          is_deleted: boolean | null
          product_id: string | null
          timestamp: string
          vending_machine_id: string | null
        }
        Insert: {
          customer_id?: string | null
          id?: string
          is_deleted?: boolean | null
          product_id?: string | null
          timestamp: string
          vending_machine_id?: string | null
        }
        Update: {
          customer_id?: string | null
          id?: string
          is_deleted?: boolean | null
          product_id?: string | null
          timestamp?: string
          vending_machine_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "transactions_customer_id_customers_id_fk"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transactions_product_id_products_id_fk"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transactions_vending_machine_id_vending_machines_id_fk"
            columns: ["vending_machine_id"]
            isOneToOne: false
            referencedRelation: "vending_machines"
            referencedColumns: ["id"]
          }
        ]
      }
      users: {
        Row: {
          created_at: string
          email: string
          id: string
          name: string
          password: string
          role: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          name: string
          password: string
          role: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          name?: string
          password?: string
          role?: string
        }
        Relationships: []
      }
      vending_machine_groups: {
        Row: {
          id: string
          machines: Json | null
        }
        Insert: {
          id?: string
          machines?: Json | null
        }
        Update: {
          id?: string
          machines?: Json | null
        }
        Relationships: []
      }
      vending_machines: {
        Row: {
          id: string
          location: string
          products: Json | null
        }
        Insert: {
          id?: string
          location: string
          products?: Json | null
        }
        Update: {
          id?: string
          location?: string
          products?: Json | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
