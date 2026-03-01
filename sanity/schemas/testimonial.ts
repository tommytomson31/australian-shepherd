import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({
      name: 'quote',
      title: 'Quote',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Author Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'e.g., "Colorado", "Austin, TX"',
    }),
    defineField({
      name: 'image',
      title: 'Photo',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Optional photo of the family or puppy',
    }),
    defineField({
      name: 'puppyName',
      title: 'Puppy Name',
      type: 'string',
      description: 'Name of the puppy they adopted',
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
      title: 'author',
      subtitle: 'location',
      media: 'image',
    },
    prepare({ title, subtitle, media }) {
      return {
        title,
        subtitle: subtitle || '',
        media,
      };
    },
  },
});
