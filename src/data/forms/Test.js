// define the fields
const schema = [
  {
    id: 'carbs',
    type: 'text-field',
    props: {
      label: 'Carbs',
      placeholder: 'Enter carbs',
      rules: [
        v => (v.length <= 10) || 'Name must be less than 10 characters',
      ],
    },
  },
  {
    id: 'protien',
    type: 'text-field',
    props: {
      label: 'protien',
      placeholder: 'Enter a Input 2',
    },
    isActive(value) {
      return !!value
    }
  },
  {
    id: 'iron',
    type: 'text-field',
    props: {
      label: 'iron',
      placeholder: 'iron',
    },
  },
  {
    id: 'select',
    type: 'select',
    props: {
      label: 'Select',
      placeholder: 'Select an option',
      clearable: true,
      items: [
        { text: '1', value: 1 },
        { text: '2', value: 2 },
      ],
    },
  },
]

// set default values
const model = {
  carbs: '',
  protien: '',
  iron: '',
  select: 2,
}

// transform the object as needed before submitting
function transform(model) {
  return model
}


export default {
  transform,
  schema,
  model,
}