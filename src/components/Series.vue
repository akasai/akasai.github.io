<template>
  <section class="series">
    <h3 class="series__title">Series</h3>
    <article class="series__wrapper">
      <ul>
        <li v-for="{node} in List">
          <g-link :to="node.path" :title="node.title">
            <section class="series__wrapper__content">
              <h4>#{{node.series}}</h4>
              <h6>{{node.date}}</h6>
              <h3>{{node.title}}</h3>
            </section>
          </g-link>
        </li>
      </ul>
    </article>
  </section>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'

  @Component({
    name: 'Series',
  })
  export default class Series extends Vue {
    @Prop() series!: any
    @Prop() cur_series!: any
    @Prop() title!: string

    constructor() {
      super()
    }

    get List() {
      return (this.series.edges || []).slice(0, 3)
    }

    getDescription(str: string): string {
      const limit = 40
      return str.length >= limit ? `${str.slice(0, limit)} ...` : str
    }
  }
</script>

<style lang="scss">
  ul {
    list-style: none;
    display: inline-flex;
    padding: 0;
    margin: 0;
  }

  .series {
    &__title {
      margin: 15px 0;
    }

    &__wrapper {
      margin: 0;
      padding: 0 0 25px 0;
      border-bottom: 1px solid var(--main-border-color);

      h3 {
        margin: 0 0 10px 0;
      }

      ul {
        max-width: 800px;
        overflow-x: auto;

        li {
          width: 230px;
          margin-right: 10px;
        }
      }

      &__content {
        height: 100px;
        padding: 8px 15px;
        border-radius: 3px;
        border: 1px solid var(--main-border-color);
        box-shadow: 0 0 4px var(--profile-bg-color);

        h4 {
          color: var(--app-font-color);
          margin: 10px 0;
        }

        h6 {
          color: var(--post-list-text-color);
          margin: 0;
        }

        h3 {
          color: var(--title-color);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        p {
          max-height: 50px;
          font-size: 0.85rem;
          color: var(--app-font-color);
        }

        &:hover {
          background: var(--related-content-color);
        }
      }
    }
  }

  @media all and (max-width: 400px) {
    .series__wrapper {
      overflow-x: scroll;
    }
  }
</style>
