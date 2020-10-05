<template>
  <section class="series">
    <h3 class="series__title">Series</h3>
    <article class="series__wrapper">
      <ul>
        <li v-for="{node} in List">
          <g-link :to="node.path" :title="node.title">
            <section class="series__wrapper__content">
              <span class="num">🗂 #{{node.series}}</span>
              <span class="title">{{node.title}}</span>
              <span class="date">{{node.date}}</span>
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
  .series {
    &__title {
      margin: 15px 0;
    }

    &__wrapper {
      margin: 0;
      padding: 0 0 25px 0;
      border-bottom: 1px solid var(--main-border-color);

      ul {
        list-style: none;
        display: inline-block;
        padding: 0;
        margin: 0;

        li {
          margin-bottom: 3px;
          &:hover {
            background: var(--related-content-color);
          }
        }
        li:last-child {
          margin-bottom: 0;
        }
      }

      &__content {
        display: flex;

        .num {
          color: var(--app-font-color);
          margin-right: 10px;
          flex: 1;
        }

        .title {
          color: var(--title-color);
          margin: 0 10px 0 0;
        }

        .date {
          color: var(--post-list-text-color);
          font-size: 0.8rem;
          margin-top: 2px;
          flex: 1;
        }
      }
    }
  }

  @media all and (max-width: 400px) {
    .series__wrapper {
      overflow-x: scroll;
    }
    .title {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      max-width: 230px;
    }
    .date {
      display: none;
    }
  }
</style>
