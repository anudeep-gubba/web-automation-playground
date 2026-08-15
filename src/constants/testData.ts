import { mulberry32, pick, randomInt } from '@/utils/seededRandom'
import type { CountryData, ListItem, Order, Product, SearchResultItem, TableRow } from '@/types'

export const COUNTRIES: CountryData[] = [
  {
    name: 'India',
    states: [
      { name: 'Telangana', cities: ['Hyderabad', 'Warangal', 'Nizamabad'] },
      { name: 'Karnataka', cities: ['Bengaluru', 'Mysuru', 'Mangaluru'] },
      { name: 'Maharashtra', cities: ['Mumbai', 'Pune', 'Nagpur'] },
    ],
  },
  {
    name: 'United States',
    states: [
      { name: 'California', cities: ['Los Angeles', 'San Francisco', 'San Diego'] },
      { name: 'New York', cities: ['New York City', 'Buffalo', 'Albany'] },
      { name: 'Texas', cities: ['Austin', 'Dallas', 'Houston'] },
    ],
  },
  {
    name: 'United Kingdom',
    states: [
      { name: 'England', cities: ['London', 'Manchester', 'Liverpool'] },
      { name: 'Scotland', cities: ['Edinburgh', 'Glasgow', 'Aberdeen'] },
    ],
  },
]

export const SKILLS = ['JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'SQL', 'DevOps', 'Testing']

const FIRST_NAMES = ['Alex', 'Jordan', 'Taylor', 'Morgan', 'Casey', 'Riley', 'Sam', 'Jamie', 'Drew', 'Avery']
const LAST_NAMES = ['Smith', 'Johnson', 'Lee', 'Brown', 'Garcia', 'Patel', 'Kim', 'Chen', 'Davis', 'Wilson']
const ROLES = ['Admin', 'Editor', 'Viewer', 'Manager']
const STATUSES: TableRow['status'][] = ['Active', 'Inactive', 'Pending']

function buildTableRows(count: number): TableRow[] {
  const rng = mulberry32(42)
  const rows: TableRow[] = []
  for (let i = 1; i <= count; i++) {
    const first = pick(rng, FIRST_NAMES)
    const last = pick(rng, LAST_NAMES)
    rows.push({
      id: i,
      name: `${first} ${last}`,
      email: `${first.toLowerCase()}.${last.toLowerCase()}${i}@example.com`,
      role: pick(rng, ROLES),
      status: pick(rng, STATUSES),
      date: new Date(2024, 0, 1 + (i % 365)).toISOString().slice(0, 10),
      amount: randomInt(rng, 10, 5000),
    })
  }
  return rows
}

// A moderate default set for the Tables module; a larger set is generated on
// demand for the Performance / Large Data scenarios (see Test Data module).
export const TABLE_ROWS: TableRow[] = buildTableRows(57)
export const LARGE_TABLE_ROWS: TableRow[] = buildTableRows(5000)

const CATEGORIES = ['Electronics', 'Clothing', 'Home', 'Sports', 'Books', 'Toys']
const PRODUCT_NAMES = ['Aurora', 'Nimbus', 'Zenith', 'Vertex', 'Cascade', 'Halo', 'Ember', 'Drift', 'Lumen', 'Rift']

export const PRODUCTS: Product[] = (() => {
  const rng = mulberry32(7)
  return Array.from({ length: 24 }, (_, i) => ({
    id: i + 1,
    name: `${pick(rng, PRODUCT_NAMES)} ${pick(rng, CATEGORIES)} #${i + 1}`,
    category: pick(rng, CATEGORIES),
    price: randomInt(rng, 5, 500),
    stock: randomInt(rng, 0, 200),
  }))
})()

export const ORDERS: Order[] = (() => {
  const rng = mulberry32(13)
  const statuses: Order['status'][] = ['Pending', 'Shipped', 'Delivered', 'Cancelled']
  return Array.from({ length: 30 }, (_, i) => {
    const product = pick(rng, PRODUCTS)
    const quantity = randomInt(rng, 1, 6)
    return {
      id: i + 1,
      productId: product.id,
      customer: `${pick(rng, FIRST_NAMES)} ${pick(rng, LAST_NAMES)}`,
      quantity,
      total: quantity * product.price,
      status: pick(rng, statuses),
      date: new Date(2024, 0, 1 + i * 3).toISOString().slice(0, 10),
    }
  })
})()

export const SIMPLE_LIST_ITEMS: ListItem[] = [
  { id: 1, label: 'Apple' },
  { id: 2, label: 'Banana' },
  { id: 3, label: 'Cherry' },
  { id: 4, label: 'Date' },
  { id: 5, label: 'Elderberry' },
  { id: 6, label: 'Fig' },
  { id: 7, label: 'Grape' },
  { id: 8, label: 'Honeydew' },
]

export const DUPLICATE_TEXT_LIST_ITEMS: ListItem[] = [
  { id: 1, label: 'Item' },
  { id: 2, label: 'Item' },
  { id: 3, label: 'Item' },
  { id: 4, label: 'Unique Item' },
  { id: 5, label: 'Item' },
]

export const NESTED_LIST = [
  {
    id: 1,
    label: 'Fruits',
    children: [
      { id: 11, label: 'Apple' },
      { id: 12, label: 'Banana' },
    ],
  },
  {
    id: 2,
    label: 'Vegetables',
    children: [
      { id: 21, label: 'Carrot' },
      { id: 22, label: 'Potato' },
    ],
  },
]

export const LARGE_LIST_ITEMS: ListItem[] = Array.from({ length: 1000 }, (_, i) => ({
  id: i + 1,
  label: `List item #${i + 1}`,
}))

export const SEARCH_CATALOG: SearchResultItem[] = [
  { id: 1, title: 'Wireless Mouse', category: 'Electronics' },
  { id: 2, title: 'Mechanical Keyboard', category: 'Electronics' },
  { id: 3, title: 'Running Shoes', category: 'Sports' },
  { id: 4, title: 'Yoga Mat', category: 'Sports' },
  { id: 5, title: 'Cookbook: Italian Classics', category: 'Books' },
  { id: 6, title: 'Automation Testing Guide', category: 'Books' },
  { id: 7, title: 'Bluetooth Headphones', category: 'Electronics' },
  { id: 8, title: 'Desk Lamp', category: 'Home' },
  { id: 9, title: 'Coffee Maker', category: 'Home' },
  { id: 10, title: 'Board Game: Strategy', category: 'Toys' },
  { id: 11, title: 'Building Blocks Set', category: 'Toys' },
  { id: 12, title: 'Winter Jacket', category: 'Clothing' },
]

export const DOWNLOAD_FILES = [
  { label: 'Download TXT', href: '/files/sample.txt', testId: 'download-txt', filename: 'sample.txt' },
  { label: 'Download CSV', href: '/files/sample.csv', testId: 'download-csv', filename: 'sample.csv' },
  { label: 'Download JSON', href: '/files/sample.json', testId: 'download-json', filename: 'sample.json' },
  { label: 'Download PDF', href: '/files/sample.pdf', testId: 'download-pdf', filename: 'sample.pdf' },
  { label: 'Download Image', href: '/images/sample.svg', testId: 'download-image', filename: 'sample.svg' },
  { label: 'Download ZIP', href: '/files/sample.zip', testId: 'download-zip', filename: 'sample.zip' },
]
