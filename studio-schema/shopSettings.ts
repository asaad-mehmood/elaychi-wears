import {HomeIcon} from '@sanity/icons/Home'
import {defineField, defineType} from 'sanity'

// One document holding the shop's name, WhatsApp number and delivery info.
export const shopSettings = defineType({
  name: 'shopSettings',
  title: 'Shop settings',
  type: 'document',
  icon: HomeIcon,
  fields: [
    defineField({name: 'name', title: 'Shop name', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({name: 'tagline', title: 'Tagline', type: 'string', description: 'One line under the name.'}),
    defineField({name: 'city', title: 'City', type: 'string'}),
    defineField({
      name: 'whatsapp',
      title: 'WhatsApp number',
      type: 'string',
      description: 'International format, digits only, e.g. 923001234567 (no +, no spaces).',
      validation: (Rule) =>
        Rule.required().regex(/^92\d{10}$/, {name: 'Pakistani number starting with 92'}),
    }),
    defineField({name: 'instagram', title: 'Instagram username', type: 'string', description: 'Without the @.'}),
    defineField({
      name: 'deliveryNote',
      title: 'Delivery line',
      type: 'string',
      description: 'e.g. "Cash on delivery all over Pakistan · Delivered in 3–5 working days".',
    }),
    defineField({
      name: 'freeDeliveryOver',
      title: 'Free delivery over (Rs)',
      type: 'number',
      validation: (Rule) => Rule.integer().min(0),
    }),
  ],
  preview: {prepare: () => ({title: 'Shop settings'})},
})
