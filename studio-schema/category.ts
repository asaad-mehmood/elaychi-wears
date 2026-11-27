import {TagIcon} from '@sanity/icons/Tag'
import {defineField, defineType} from 'sanity'

export const category = defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  icon: TagIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Name',
      type: 'string',
      description: 'Shown as a filter button on the shop, e.g. "Pret" or "Winter".',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Short ID',
      type: 'slug',
      description: 'Click "Generate". Used in links like /#winter; do not change it later.',
      options: {source: 'title', maxLength: 40},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'blurb',
      title: 'One-line description',
      type: 'string',
      description: 'Shown under the category name, e.g. "Velvet, khaddar and shawl suits".',
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      description: '1 comes first, then 2, 3 and so on.',
      validation: (Rule) => Rule.required().integer().min(1),
    }),
  ],
  orderings: [{title: 'Order', name: 'orderAsc', by: [{field: 'order', direction: 'asc'}]}],
  preview: {select: {title: 'title', subtitle: 'blurb'}},
})
