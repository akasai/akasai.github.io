<template>
  <section class="tag__wrapper" v-if="tagList.length">
    <Tags v-if="useIcon" class="icon" :class="tagSize"/>
    <ul>
      <li :class="tagSize" v-for="tag in tagList">
        <g-link v-if="typeof tag !== 'string'" :to="tag.path">
          {{tag.title}}
        </g-link>
        <span v-else>{{tag}}</span>
      </li>
    </ul>
  </section>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import Tags from '~/assets/svg/tags.svg'

  type TagSize = 'small' | 'medium' | 'large'

  @Component({
    name: 'Tag',
    components: {
      Tags
    }
  })
  export default class Tag extends Vue {
    @Prop() tagList!: any[]
    @Prop() size!: TagSize
    @Prop() useIcon!: boolean

    private tagSize: TagSize

    constructor() {
      super()
      this.tagSize = (this.size || 'medium')
    }
  }
</script>

<style lang="scss" scoped>
  .tag__wrapper {
    font-family: gugi;
    color: var(--app-font-color);
    margin-top: 5px;
    display: flex;

    .icon {
      vertical-align: text-bottom;
      margin-right: 10px;

      &.small {
        width: 15px;
      }

      &.medium {
        width: 15px;
      }

      &.large {
        width: 15px;
      }
    }

    ul {
      display: flex;
      flex-wrap: wrap;

      li {
        margin-bottom: 4px;
        border-radius: 3px;
        background: var(--tag-bg-color);

        a {
          color: var(--app-font-color);
        }

        &.small {
          font-size: 0.8rem;
          margin-right: 4px;
          padding: 4px 5px 2px 5px;
        }

        &.medium {
          font-size: 1.2rem;
          margin-right: 5px;
          padding: 5px 7px 3px 7px
        }

        &.large {
          font-size: 1.6rem;
          margin-right: 6px;
          padding: 6px 10px 5px 10px;
        }
      }
    }
  }
</style>
