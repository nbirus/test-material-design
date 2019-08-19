export default [
  {
    type: 'text-field',
    id: 'carbs',
    props: {
      label: 'carbs',
      placeholder: 'carbs',
      rules: [
        v => (v.length <= 10) || 'Name must be less than 10 characters',
      ],
    },
  },
  {
    type: 'text-field',
    id: 'protien',
    props: {
      label: 'protien',
      placeholder: 'Enter a Input 2',
    },
  },
  {
    type: 'text-field',
    id: 'iron',
    props: {
      label: 'iron',
      placeholder: 'iron',
    },
  },
]