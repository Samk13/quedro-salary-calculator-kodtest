<template>
  <div :class="mapToClassList()">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

enum Width {
  Small = 'sm',
  Medium = 'md',
  Large = 'lg',
  ExrtraLarge = 'xl'
}
interface Props {
  width: Width
}

// Defenitlly an overengineering, reason why is I will use it in more than one place and I wanna show some concepts here like interface emum and validators and it's cool

export default defineComponent({
  props: {
    width: {
      type: String,
      validators: (value: Width) =>
        [Width.Small, Width.Medium, Width.Large, Width.ExrtraLarge].includes(
          value
        ),
      required: false,
      default: Width.Large
    }
  },
  setup(props: Props) {
    const mapToClassList = () => {
      const classList = [
        `max-w-screen-${props.width}`,
        'container',
        'mx-auto',
        'px-4'
      ]

      return classList.join(' ')
    }

    return {
      mapToClassList
    }
  }
})
</script>
