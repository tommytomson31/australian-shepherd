import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'parent',
  title: 'Parent Dog',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'gender',
      title: 'Gender',
      type: 'string',
      options: {
        list: [
          { title: 'Male (Sire)', value: 'male' },
          { title: 'Female (Dam)', value: 'female' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'color',
      title: 'Color/Markings',
      type: 'string',
      description: 'e.g., "Blue Merle", "Red Tri", "Black Tri"',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'healthTests',
      title: 'Health Tests',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'List of completed health tests',
    }),
    defineField({
      name: 'akc',
      title: 'AKC Registration',
      type: 'string',
      description: 'AKC registration number or status',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'gender',
      media: 'images.0',
    },
    prepare({ title, subtitle, media }) {
      const genderLabel = subtitle === 'male' ? 'Sire' : subtitle === 'female' ? 'Dam' : '';
      return {
        title,
        subtitle: genderLabel,
        media,
      };
    },
  },
});
