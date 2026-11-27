import {PackageIcon} from '@sanity/icons/Package'
import {defineArrayMember, defineField, defineType} from 'sanity'

const SIZES = ['XS', 'S', 'M', 'L', 'XL']

export const product = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  icon: PackageIcon,
  groups: [
    {name: 'basics', title: 'Basics', default: true},
    {name: 'stock', title: 'Price & stock'},
    {name: 'details', title: 'Details'},
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Product name',
      type: 'string',
      group: 'basics',
      description: 'Short and memorable, e.g. "Anaar".',
      validation: (Rule) => Rule.required().max(40),
    }),
    defineField({
      name: 'subtitle',
      title: 'What is it?',
      type: 'string',
      group: 'basics',
      description: 'One short line, e.g. "Embroidered 3-piece".',
      validation: (Rule) => Rule.required().max(60),
    }),
    defineField({
      name: 'slug',
      title: 'Link name',
      type: 'slug',
      group: 'basics',
      description: 'Click "Generate". Becomes the page address, e.g. /product/anaar.',
      options: {source: 'title', maxLength: 60},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      group: 'basics',
      to: [{type: 'category'}],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'images',
      title: 'Photos',
      type: 'array',
      group: 'basics',
      description: 'First photo is the main one. Portrait photos (4:5) look best.',
      of: [
        defineArrayMember({
          type: 'image',
          options: {hotspot: true},
          fields: [
            defineField({
              name: 'alt',
              title: 'Describe the photo',
              type: 'string',
              description: 'For blind visitors and Google, e.g. "Red embroidered 3-piece suit".',
              validation: (Rule) => Rule.required().warning('A short description helps.'),
            }),
          ],
        }),
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'code',
      title: 'Product code',
      type: 'string',
      group: 'stock',
      description: 'Your own code, e.g. "EW-301". It is sent in the WhatsApp order message.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'price',
      title: 'Price (Rs)',
      type: 'number',
      group: 'stock',
      description: 'Numbers only, no commas, e.g. 8450.',
      validation: (Rule) => Rule.required().integer().positive(),
    }),
    defineField({
      name: 'salePrice',
      title: 'Sale price (Rs)',
      type: 'number',
      group: 'stock',
      description: 'Leave empty if it is not on sale.',
      validation: (Rule) =>
        Rule.integer()
          .positive()
          .custom((sale, ctx) => {
            const price = (ctx.document as {price?: number})?.price
            return !sale || !price || sale < price ? true : 'Sale price should be lower than the normal price.'
          }),
    }),
    defineField({
      name: 'sizeMode',
      title: 'Sizes',
      type: 'string',
      group: 'stock',
      options: {
        list: [
          {title: 'Standard sizes (XS–XL)', value: 'standard'},
          {title: 'Made to order (no sizes)', value: 'made-to-order'},
        ],
        layout: 'radio',
      },
      initialValue: 'standard',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'sizesInStock',
      title: 'Sizes in stock',
      type: 'array',
      group: 'stock',
      description: 'Tick the sizes you can send right now. Untick all = shows "Sold out".',
      of: [{type: 'string'}],
      options: {list: SIZES.map((s) => ({title: s, value: s})), layout: 'grid'},
      hidden: ({document}) => document?.sizeMode === 'made-to-order',
      initialValue: SIZES,
    }),
    defineField({
      name: 'isNew',
      title: 'Show "New" label',
      type: 'boolean',
      group: 'stock',
      initialValue: true,
    }),
    defineField({
      name: 'colour',
      title: 'Colour',
      type: 'string',
      group: 'details',
    }),
    defineField({
      name: 'fabric',
      title: 'Fabric',
      type: 'string',
      group: 'details',
      description: 'e.g. "Cambric shirt, cotton trouser, chiffon dupatta".',
    }),
    defineField({
      name: 'pieces',
      title: 'What you get',
      type: 'string',
      group: 'details',
      description: 'e.g. "3-piece · stitched".',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      group: 'details',
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      group: 'basics',
      description: '1 shows first on the shop, then 2, 3 and so on.',
      validation: (Rule) => Rule.required().integer().min(1),
    }),
  ],
  orderings: [{title: 'Order', name: 'orderAsc', by: [{field: 'order', direction: 'asc'}]}],
  preview: {
    select: {title: 'title', subtitle: 'subtitle', media: 'images.0', price: 'price', sizes: 'sizesInStock', mode: 'sizeMode'},
    prepare: ({title, subtitle, media, price, sizes, mode}) => ({
      title,
      subtitle: `${subtitle ?? ''} · Rs ${price ?? '?'}${mode === 'standard' && !sizes?.length ? ' · SOLD OUT' : ''}`,
      media,
    }),
  },
})
