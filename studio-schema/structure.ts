// Sidebar layout for the Studio. Use it in sanity.config.ts:
//   structureTool({ structure })
import {HomeIcon} from '@sanity/icons/Home'
import {PackageIcon} from '@sanity/icons/Package'
import {TagsIcon} from '@sanity/icons/Tags'
import type {StructureResolver} from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Shop')
    .items([
      S.listItem()
        .title('Shop settings')
        .icon(HomeIcon)
        .id('shopSettings')
        .child(S.document().schemaType('shopSettings').documentId('shopSettings').title('Shop settings')),
      S.divider(),
      S.documentTypeListItem('product')
        .title('Products')
        .icon(PackageIcon)
        .child(S.documentTypeList('product').title('Products').defaultOrdering([{field: 'order', direction: 'asc'}])),
      S.documentTypeListItem('category')
        .title('Categories')
        .icon(TagsIcon)
        .child(S.documentTypeList('category').title('Categories').defaultOrdering([{field: 'order', direction: 'asc'}])),
    ])
