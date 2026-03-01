import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'puppy',
  title: 'Puppy',
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
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'gender',
      title: 'Gender',
      type: 'string',
      options: {
        list: [
          { title: 'Male', value: 'male' },
          { title: 'Female', value: 'female' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'age',
      title: 'Age',
      type: 'string',
      description: 'e.g., "9 Weeks", "12 Weeks"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'number',
      validation: (Rule) => Rule.required().positive(),
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Available', value: 'available' },
          { title: 'Reserved', value: 'reserved' },
          { title: 'Sold', value: 'sold' },
        ],
        layout: 'radio',
      },
      initialValue: 'available',
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
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'parents',
      title: 'Parents',
      type: 'object',
      fields: [
        {
          name: 'mother',
          title: 'Mother',
          type: 'reference',
          to: [{ type: 'parent' }],
        },
        {
          name: 'father',
          title: 'Father',
          type: 'reference',
          to: [{ type: 'parent' }],
        },
      ],
    }),
    defineField({
      name: 'orderRank',
      title: 'Order',
      type: 'number',
      description: 'Lower numbers appear first',
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'status',
      media: 'images.0',
    },
    prepare({ title, subtitle, media }) {
      return {
        title,
        subtitle: subtitle ? subtitle.charAt(0).toUpperCase() + subtitle.slice(1) : '',
        media,
      };
    },
  },
});
