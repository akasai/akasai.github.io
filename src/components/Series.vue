<template>
  <section class="series">
    <h3 id="title">Series</h3>
    <article class="series__wrapper">
      <ul>
        <li v-for="{node} in this.series.edges">
          <g-link :to="node.path" :title="node.title">
            <section class="series__wrapper__content">
              <span class="num">#{{node.series_num}}</span>
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
    @Prop() cur_series_num!: any
    @Prop() title!: string

    constructor() {
      super()
    }
  }
</script>

<style lang="scss">
  .series {
    padding: 20px 0;
    border-bottom: 1px solid var(--main-border-color);

    h3#title {
      font-size: 1.7rem;
      margin-bottom: 10px;
    }

    &__wrapper {
      font-size: 1.5rem;

      ul {
        display: inline-block;

        li {
          margin-bottom: 5px;

          &:last-child {
            margin-bottom: 0;
          }
        }
      }

      &__content {
        display: flex;

        .num {
          font-size: 1.3rem;
          color: var(--app-font-color);
          margin: 3px 10px 0 0;
        }

        .title {
          font-size: 1.8rem;
          color: var(--title-font-color);
          margin: 0 10px 0 0;
        }

        .date {
          font-size: 1.3rem;
          color: var(--posting-info-font-color);
          margin: 5px 0 0 0;
          flex: 1;
        }
      }
    }
  }

  @media all and (max-width: 400px) {
    .series__wrapper {
      overflow-x: scroll;
    }
    .series__wrapper__content {
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
  }
</style>
