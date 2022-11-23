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
  men: Men
  women: Women
  kids: Kids
}

export interface Men {
  name: string
  path: string
}

export interface Women {
  name: string
  path: string
}

export interface Kids {
  name: string
  path: string
}

export interface Admin {
  products: Products
  orders: Orders
  users: Users
}

export interface Products {
  name: string
  path: string
}

export interface Orders {
  name: string
  path: string
}

export interface Users {
  name: string
  path: string
}

export interface Account {
  profile: Profile
  orders: Orders2
  login: Login
  logout: Logout
}

export interface Profile {
  name: string
  path: string
}

export interface Orders2 {
  name: string
  path: string
}

export interface Login {
  name: string
  path: string
}

export interface Logout {
  name: string
  path: string
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
  title: string,
  subtitle: string,
  message: string,
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
