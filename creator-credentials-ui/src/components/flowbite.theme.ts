import { CustomFlowbiteTheme } from 'flowbite-react';

export const flowbiteTheme: CustomFlowbiteTheme = {
  button: {
    color: {
      primary:
        'text-white bg-primary border border-primary hover:bg-primary-hover focus:ring-4 focus:ring-primary-hover disabled:bg-grey-3 disabled:border-grey-3 fill-white',
      outline:
        'text-primary bg-white border border-primary hover:border-primary-hover hover:text-primary-hover focus:ring-4 focus:ring-primary-hover disabled:text-grey-3 disabled:border-grey-3 disabled:bg-white disabled:fill-grey-3 fill-primary',
      'outline-black':
        'text-black bg-white border border-transparent focus:ring-4 focus:ring-black disabled:text-grey-3 disabled:bg-white fill-black',
      black:
        'text-black bg-transparent border border-black hover:border-black hover:text-black focus:ring-4 focus:ring-black disabled:text-grey-3 disabled:border-grey-3 disabled:bg-white fill-black',
      text: 'text-primary bg-transparent hover:text-primary-hover focus:text-primary-hover disabled:bg-transparent disabled:text-grey-3 fill-primary disabled:fill-grey-3',
    },
    size: {
      md: 'text-sm px-4 py-1.5 font-normal text-base',
    },
    disabled: 'cursor-not-allowed bg-grey-3 hover:bg-grey-3 border-grey-3',
  },
  textInput: {
    field: {
      base: 'relative w-full fill-grey-4',
      input: {
        base: 'block w-full border border-grey-2 disabled:cursor-not-allowed disabled:opacity-50 placeholder-grey-4',
        sizes: {
          md: 'py-2 text-sm px-4',
          lg: 'py-3 text-sm px-4',
        },
      },
    },
  },
  label: {
    root: {
      base: 'text-sm',
    },
  },
  checkbox: {
    root: {
      base: 'h-4 w-4 rounded focus:ring-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 bg-white',
      color: {
        default:
          'focus:ring-primary dark:ring-offset-primary dark:focus:ring-primary text-primary disabled:text-grey-3 hover:text-primary-hover',
        primary:
          'focus:ring-primary dark:ring-offset-primary dark:focus:ring-primary text-primary disabled:text-grey-3 hover:text-primary-hover',
      },
    },
  },
  card: {
    root: {
      base: 'flex rounded-lg shadow border border-neutral-100 bg-white dark:border-gray-700 dark:bg-gray-800',
    },
  },
  tooltip: {
    style: {
      dark: 'bg-black text-white',
    },
  },
  spinner: {
    color: {
      info: 'fill-primary',
    },
  },
  textarea: {
    colors: {
      gray: 'bg-white border-grey-2 text-grey-4 focus:border-black focus:ring-black',
    },
  },
  tab: {
    base: 'text-base',
    tablist: {
      base: 'inline-flex gap-8 mb-3',
      styles: {
        underline: 'border-b-2 border-grey-3 gap-8',
      },
      tabitem: {
        base: 'items-center justify-center p-4 rounded-t-lg text-sm font-medium first:ml-0 disabled:cursor-not-allowed disabled:text-gray-400 disabled:dark:text-gray-500 focus:border-grey-4 focus:outline-none border-b-2 border-transparent text-gray-500',
        styles: {
          underline: {
            base: '-mb-0.5 px-8 py-2',
            active: {
              on: 'text-base text-black border-b-2 border-black hover:border-black font-bold',
              off: 'text-grey-4 text-base',
            },
          },
        },
      },
    },
  },
  dropdown: {
    floating: {
      style: {
        light: 'border border-grey-2 bg-white text-grey-4',
      },
    },
  },
};
