export interface ILanguage {
  ui: Ui
  home: Home
  error404: Error404
}

export interface Ui {
  shop_layout: ShopLayout
}

export interface ShopLayout {
  side_menu: SideMenu
}

export interface SideMenu {
  categories: Categories
  admin: Admin
  account: Account
}

export interface Categories {
  subheader: string
  men: string
  women: string
  kids: string
}

export interface Admin {
  subheader: string
  products: string
  orders: string
  users: string
}

export interface Account {
  subheader: string
  profile: string
  orders: string
  login: string
  logout: string
}

export interface Home {
  seo: Seo
  page_content: PageContent
}

export interface Seo {
  title: string
  description: string
}

export interface PageContent {
  title: string
  subtitle: string
  message: string
}

export interface Error404 {
  seo: Seo2
  page_content: PageContent2
}

export interface Seo2 {
  title: string
  description: string
}

export interface PageContent2 {
  title: string
  description: string
}
