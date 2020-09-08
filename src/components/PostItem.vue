<template>
  <div class="post-preview">
    <g-link :to="post.path" class="post-title">
      <h1>{{post.title}}</h1>
    </g-link>
    <p class="post-content">
      {{post.description}}
    </p>
    <span class="date">
      <font-awesome-icon :icon="ICON_CLOCK" class="clock_icon"/>
      {{date}}
    </span>
    <span class="time-to-read"><i>{{post.timeToRead}} min read</i></span>
  </div>
</template>

<script lang="ts">
  import { faClock, IconDefinition } from '@fortawesome/free-solid-svg-icons'
  import { Component, Prop, Vue } from 'vue-property-decorator'

  @Component({
    name: 'PostItem',
  })
  export default class PostItem extends Vue {
    ICON_CLOCK: IconDefinition

    @Prop() post!: any

    constructor() {
      super()
      this.ICON_CLOCK = faClock
    }

    get date() {
      return this.post.date.substring(0, this.post.date.length - 4)
    }
  }
</script>

<style lang="scss">
  .post-preview {
    padding-top: 1rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid var(--main-border-color);

    .post-title {
      color: var(--title-color);
    }

    .post-content {
      margin-top: .6rem;
      margin-bottom: .6rem;
      color: var(--post-list-text-color);
    }

    .date {
      margin-right: 10px;
      min-width: 60px;
      display: inline-block;

      .clock_icon {
        width: 0.9rem;
        margin-right: 2px;
      }
    }
  }


  .time-to-read {
    margin-left: 10px;
    color: gray;
    font-size: .8em;
  }
</style>
