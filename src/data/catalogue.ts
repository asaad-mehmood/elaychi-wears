// Demo content for "Ilaychi", a made-up Pakistani clothing brand.
//
// This file stands in for Sanity. Its shape matches the GROQ query in
// src/lib/catalogue.ts, so when a real shop gets an admin panel, the pages
// keep working and only the data source changes.
//
// Photos: free Unsplash photos (Unsplash License), hot-linked from Unsplash's
// CDN as Unsplash asks. Each photo's credit is listed on /credits.

import type { Category, Product, SanityImage, ShopSettings } from "./types";

export const settings: ShopSettings = {
  name: "Ilaychi",
  tagline: "Eastern wear, cut and stitched in Lahore",
  city: "Lahore",
  // Demo orders go to Asaad's WhatsApp. A real shop puts its own number here.
  whatsapp: "923276277218",
  instagram: "ilaychi.demo",
  deliveryNote: "Cash on delivery all over Pakistan · Delivered in 3–5 working days",
  freeDeliveryOver: 6000,
};

const photographers = {
  shireen: { name: "Shireen Lakdawala", user: "shireenlakdawala1" },
  muneeb: { name: "Muneeb Malhotra", user: "muneebmalhotra" },
  talha: { name: "Talha Hadi", user: "talha6566" },
  naeem: { name: "Naeem Ad", user: "mnaeemad" },
  suitsme: { name: "Suits Me Online", user: "suitsmeonline" },
} as const;

const utm = "utm_source=ilaychi_demo&utm_medium=referral";

function img(
  key: string,
  photoId: string,
  pageId: string,
  by: keyof typeof photographers,
  alt: string,
): SanityImage {
  const p = photographers[by];
  return {
    _key: key,
    url: `https://images.unsplash.com/photo-${photoId}`,
    alt,
    credit: {
      name: p.name,
      profileUrl: `https://unsplash.com/@${p.user}?${utm}`,
      photoUrl: `https://unsplash.com/photos/${pageId}?${utm}`,
    },
  };
}

export const categories: Category[] = [
  { _id: "cat-pret", _type: "category", title: "Pret", slug: { current: "pret" }, blurb: "Easy 2-piece sets for everyday", order: 1 },
  { _id: "cat-3pc", _type: "category", title: "3-Piece", slug: { current: "3-piece" }, blurb: "Shirt, trouser and dupatta", order: 2 },
  { _id: "cat-winter", _type: "category", title: "Winter", slug: { current: "winter" }, blurb: "Velvet, khaddar and shawl suits", order: 3 },
  { _id: "cat-formal", _type: "category", title: "Formals", slug: { current: "formals" }, blurb: "For dholkis, dinners and mehndis", order: 4 },
  { _id: "cat-bridal", _type: "category", title: "Bridal", slug: { current: "bridal" }, blurb: "Made to order, fitted to you", order: 5 },
];

const cat = (slug: string) => {
  const c = categories.find((x) => x.slug.current === slug)!;
  return { _id: c._id, title: c.title, slug: c.slug };
};

const ALL: Product["sizesInStock"] = ["XS", "S", "M", "L", "XL"];

export const products: Product[] = [
  {
    _id: "p-anaar", _type: "product", title: "Anaar", subtitle: "Embroidered 3-piece",
    slug: { current: "anaar" }, code: "ILY-301", price: 8450,
    category: cat("3-piece"),
    images: [img("a1", "1733470381571-c3d082e68457", "rJirD6eI26I", "shireen", "Model in a deep red embroidered shirt, trousers and dupatta in front of a flower arch")],
    colour: "Pomegranate red", fabric: "Cambric shirt, cotton trouser, chiffon dupatta", pieces: "3-piece · stitched",
    description: "A deep pomegranate red with tonal thread embroidery down the front, pintucked trousers and a chiffon dupatta with a scalloped border. The one you wear when you want to be asked where it's from.",
    sizesInStock: ["S", "M", "L"], sizeMode: "standard", isNew: true, order: 1,
  },
  {
    _id: "p-makhan", _type: "product", title: "Makhan", subtitle: "Butter-yellow pret set",
    slug: { current: "makhan" }, code: "ILY-204", price: 4850,
    category: cat("pret"),
    images: [img("a1", "1733470324488-d0e10d014d80", "hbzeoDjfDAw", "shireen", "Model in a soft butter-yellow kurta and trousers beside a floral arch")],
    colour: "Butter yellow", fabric: "Lawn, lined", pieces: "2-piece · stitched",
    description: "Soft lawn in the colour of fresh makhan, with a straight cut and a small embroidered neckline. Breathes in October sun and still looks neat by evening.",
    sizesInStock: ALL, sizeMode: "standard", isNew: true, order: 2,
  },
  {
    _id: "p-raat", _type: "product", title: "Raat", subtitle: "Velvet suit with shawl",
    slug: { current: "raat" }, code: "ILY-402", price: 12900,
    category: cat("winter"),
    images: [img("a1", "1704119142483-1269733bcedb", "Sf-ljYw9WUs", "muneeb", "Model seated in a black velvet suit with an embroidered shawl")],
    colour: "Black", fabric: "Micro velvet shirt, grip trouser, embroidered wool-blend shawl", pieces: "3-piece · stitched",
    description: "Black micro velvet with a heavy embroidered shawl. Warm enough for December weddings in Lahore, quiet enough for a family dinner.",
    sizesInStock: ["M", "L"], sizeMode: "standard", isNew: false, order: 3,
  },
  {
    _id: "p-jamun", _type: "product", title: "Jamun", subtitle: "Plum suit with shawl",
    slug: { current: "jamun" }, code: "ILY-405", price: 10750, salePrice: 8990,
    category: cat("winter"),
    images: [img("a1", "1733731402869-57e0cce24aea", "3Axn3NiNh7A", "shireen", "Model in a plum shirt and trousers with a dark shawl over one shoulder")],
    colour: "Jamun plum", fabric: "Khaddar shirt and trouser, embroidered shawl", pieces: "3-piece · stitched",
    description: "Khaddar in a deep jamun purple with a contrast shawl. Our winter bestseller from last year, back for a short time.",
    sizesInStock: ["S", "M", "L", "XL"], sizeMode: "standard", isNew: false, order: 4,
  },
  {
    _id: "p-neelam", _type: "product", title: "Neelam", subtitle: "Powder-blue 3-piece",
    slug: { current: "neelam" }, code: "ILY-306", price: 7650,
    category: cat("3-piece"),
    images: [img("a1", "1733470381436-bb5a2a441708", "emXLNzgf3p4", "shireen", "Model in a powder-blue embroidered suit standing under a floral archway")],
    colour: "Powder blue", fabric: "Lawn shirt, cambric trouser, organza dupatta", pieces: "3-piece · stitched",
    description: "Powder blue with white thread work and a sheer organza dupatta. Light, a little formal, and very easy to wear.",
    sizesInStock: ALL, sizeMode: "standard", isNew: true, order: 5,
  },
  {
    _id: "p-kohl", _type: "product", title: "Kohl", subtitle: "Black formal with printed dupatta",
    slug: { current: "kohl" }, code: "ILY-503", price: 15900,
    category: cat("formals"),
    images: [img("a1", "1733470381591-c5dfb9df3c3d", "aBdtyKmjs7c", "shireen", "Model in a black embroidered formal with a black and white dupatta")],
    colour: "Black and ivory", fabric: "Raw silk shirt, silk trouser, printed chiffon dupatta", pieces: "3-piece · stitched",
    description: "Black raw silk with ivory embroidery and a printed chiffon dupatta. Our answer to \"what do I wear to the dholki?\"",
    sizesInStock: ["S", "M"], sizeMode: "standard", isNew: false, order: 6,
  },
  {
    _id: "p-firoza", _type: "product", title: "Firoza", subtitle: "Teal bridal lehenga",
    slug: { current: "firoza" }, code: "ILY-901", price: 185000,
    category: cat("bridal"),
    images: [
      img("a1", "1747847471517-952a3eb93a89", "JDYxnaxFJws", "naeem", "Bride in a teal and gold heavily embroidered outfit with jewellery"),
      img("a2", "1747847470997-73ae2cd1cfaa", "Xco0gWXMJf4", "naeem", "Bride in a teal bridal dress with gold embroidery, full view"),
    ],
    colour: "Firoza teal and antique gold", fabric: "Raw silk, hand-done zardozi, net dupatta", pieces: "Lehenga, choli and dupatta · made to order",
    description: "Hand-embroidered zardozi on firoza raw silk. Made to your measurements in 8–10 weeks. Price starts here and changes with the work you choose.",
    sizesInStock: [], sizeMode: "made-to-order", isNew: false, order: 7,
  },
  {
    _id: "p-shabnam", _type: "product", title: "Shabnam", subtitle: "Ice-white pret set",
    slug: { current: "shabnam" }, code: "ILY-209", price: 4450,
    category: cat("pret"),
    images: [img("a1", "1733209590486-4ed0bfcbc52a", "VshbFm-cBeo", "shireen", "Model in an ice-white kurta and straight trousers on steps")],
    colour: "Ice white", fabric: "Cotton net over lawn", pieces: "2-piece · stitched",
    description: "Cotton net layered over lawn, with lace on the sleeves. Like morning dew, hence the name.",
    sizesInStock: ["XS", "S", "M"], sizeMode: "standard", isNew: false, order: 8,
  },
  {
    _id: "p-gulabi", _type: "product", title: "Gulabi", subtitle: "Blush pret set",
    slug: { current: "gulabi" }, code: "ILY-211", price: 4650,
    category: cat("pret"),
    images: [img("a1", "1733209484732-6b094322a89f", "QXRL6XkxYNk", "shireen", "Model in a blush-pink kurta and trousers in a bright living room")],
    colour: "Blush pink", fabric: "Cotton silk", pieces: "2-piece · stitched",
    description: "A soft gulabi in cotton silk with a slight sheen. Goes from university to dinner with one change of earrings.",
    sizesInStock: ALL, sizeMode: "standard", isNew: false, order: 9,
  },
  {
    _id: "p-pudina", _type: "product", title: "Pudina", subtitle: "Mint pret set",
    slug: { current: "pudina" }, code: "ILY-214", price: 4650,
    category: cat("pret"),
    images: [img("a1", "1733209589578-97136bee7d7a", "OeYXZyM63cQ", "shireen", "Model in a mint-green embroidered kurta and trousers next to white flowers")],
    colour: "Mint", fabric: "Lawn with schiffli", pieces: "2-piece · stitched",
    description: "Fresh mint lawn with schiffli embroidery on the front. Our most re-ordered pret this season.",
    sizesInStock: [], sizeMode: "standard", isNew: false, order: 10,
  },
  {
    _id: "p-sarson", _type: "product", title: "Sarson", subtitle: "Mustard 3-piece",
    slug: { current: "sarson" }, code: "ILY-309", price: 6950,
    category: cat("3-piece"),
    images: [img("a1", "1701252072712-e939599623f2", "TP9IdIX6QR8", "muneeb", "Model in a mustard-yellow shirt holding a long printed dupatta")],
    colour: "Mustard", fabric: "Lawn shirt and trouser, printed silk dupatta", pieces: "3-piece · stitched",
    description: "Sarson-field yellow with a long printed silk dupatta that does most of the talking.",
    sizesInStock: ["S", "M", "L", "XL"], sizeMode: "standard", isNew: false, order: 11,
  },
  {
    _id: "p-nimbu", _type: "product", title: "Nimbu", subtitle: "Lemon pret set",
    slug: { current: "nimbu" }, code: "ILY-216", price: 4250,
    category: cat("pret"),
    images: [img("a1", "1733209587923-77ff33202f7c", "E4Q1-2Bej0c", "shireen", "Model in a pale lemon kurta and trousers holding a small green bag")],
    colour: "Lemon", fabric: "Lawn", pieces: "2-piece · stitched",
    description: "Pale nimbu lawn with a delicate neckline. Your summer default, now with a lining.",
    sizesInStock: ["S", "M", "L"], sizeMode: "standard", isNew: false, order: 12,
  },
  {
    _id: "p-dhuan", _type: "product", title: "Dhuan", subtitle: "Grey suit with black shawl",
    slug: { current: "dhuan" }, code: "ILY-408", price: 9850,
    category: cat("winter"),
    images: [img("a1", "1773439878338-c61b0fe9ed48", "2UjQP0mqU-A", "muneeb", "Model in a smoke-grey embroidered suit with a black shawl")],
    colour: "Smoke grey", fabric: "Linen shirt and trouser, embroidered shawl", pieces: "3-piece · stitched",
    description: "Smoke-grey linen with a black embroidered shawl. Cool tones for foggy Lahore mornings.",
    sizesInStock: ["M", "L", "XL"], sizeMode: "standard", isNew: true, order: 13,
  },
  {
    _id: "p-samandar", _type: "product", title: "Samandar", subtitle: "Aqua pret set",
    slug: { current: "samandar" }, code: "ILY-218", price: 4850,
    category: cat("pret"),
    images: [img("a1", "1733209588000-339b73c36575", "O3YKa1jtcYg", "shireen", "Model in an aqua kurta and trousers beside a pool")],
    colour: "Aqua", fabric: "Cotton lawn", pieces: "2-piece · stitched",
    description: "Sea-glass aqua with tonal embroidery at the hem. Light and calm.",
    sizesInStock: ALL, sizeMode: "standard", isNew: false, order: 14,
  },
  {
    _id: "p-gulnaz", _type: "product", title: "Gulnaz", subtitle: "Lilac chiffon formal",
    slug: { current: "gulnaz" }, code: "ILY-507", price: 16500,
    category: cat("formals"),
    images: [
      img("a1", "1705920824583-0e783235394d", "zWaiJcc0WAc", "muneeb", "Model in a lilac chiffon formal with an embroidered dupatta"),
      img("a2", "1702974779825-7103511e5471", "ZmufO_Sw0Sg", "muneeb", "Close-up of embroidered lilac sleeve and a small bag"),
    ],
    colour: "Lilac", fabric: "Chiffon shirt, silk trouser, chiffon dupatta", pieces: "3-piece · stitched",
    description: "Lilac chiffon with sequin and thread work on the sleeves and dupatta. Swipe for a close-up of the sleeve.",
    sizesInStock: ["S", "M", "L"], sizeMode: "standard", isNew: true, order: 15,
  },
  {
    _id: "p-raat-rani", _type: "product", title: "Raat Rani", subtitle: "Navy embroidered formal",
    slug: { current: "raat-rani" }, code: "ILY-510", price: 18900,
    category: cat("formals"),
    images: [img("a1", "1614098097306-c67b8020c04e", "_MrdhhuR26Q", "suitsme", "Model in a navy formal with white floral embroidery and a sheer dupatta")],
    colour: "Navy and white", fabric: "Organza shirt, silk trouser, net dupatta", pieces: "3-piece · stitched",
    description: "Navy organza scattered with white flowers, like the raat rani that blooms at night.",
    sizesInStock: ["M"], sizeMode: "standard", isNew: false, order: 16,
  },
  {
    _id: "p-surkh", _type: "product", title: "Surkh", subtitle: "Red bridal lehenga",
    slug: { current: "surkh" }, code: "ILY-903", price: 165000,
    category: cat("bridal"),
    images: [img("a1", "1707576618343-26a1b377ca7a", "x1h4Nw0CwfY", "talha", "Bride in a red embroidered lehenga in front of a white building")],
    colour: "Surkh red", fabric: "Velvet lehenga, raw silk choli, net dupatta", pieces: "Lehenga, choli and dupatta · made to order",
    description: "Classic surkh red, hand-embroidered and fitted to you. Book a call on WhatsApp to choose the work and colours.",
    sizesInStock: [], sizeMode: "made-to-order", isNew: false, order: 17,
  },
];
