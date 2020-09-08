<template>
  <section id="sidebar">
    <section class="profile-wrapper">
      <article class="profile-img">
        <span>
          <img src="https://chirpy.cotes.info/assets/img/sample/avatar.jpg" alt=""/>
        </span>
      </article>
      <article class="profile-text">
        <!--    <g-link to="/"><h1>👨‍💻 {{siteName}}</h1></g-link>-->
        text
        <p class="site-subtitle font-italic">
          sub
        </p>
      </article>
    </section>
    <nav class="nav-wrapper">
      <ul>
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
      </ul>
    </nav>
    <section class="sidebar-footer">
      footer
    </section>
  </section>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'

  @Component({
    name: 'SideBar',
  })
  export default class SideBar extends Vue {
    constructor() {
      super()
    }
  }
</script>

<style lang="scss">
  #sidebar {
    padding-left: 0;
    padding-right: 0;
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    overflow-y: auto;
    width: 260px;
    z-index: 99;

    > a {
      color: rgba(255, 255, 255, 0.5);
      transition: color 0.35s ease-in-out;
      user-select: none;
      margin: 0 0.25rem;
    }

    .profile-wrapper {
      margin-top: 3rem;
      display: flex;
      flex-direction: column;
      /*background: red;*/

      .profile-img {
        display: flex;
        justify-content: center;

        span {
          display: block;
          width: 6rem;
          height: 6rem;
          border-radius: 50%;
          border: 2px solid #b6b6b6;
          overflow: hidden;
          transform: translateZ(0);
          -webkit-transition: border-color 0.35s ease-in-out;
          -moz-transition: border-color 0.35s ease-in-out;
          transition: border-color 0.35s ease-in-out;

          img {
            width: 100%;
            height: 100%;
            vertical-align: middle;
            border-style: none;
            -webkit-transition: transform .5s;
            -moz-transition: transform .5s;
            transition: transform .5s;
          }
        }
      }

      .profile-text {
        margin-top: 1rem;
        text-align: center;

        .site-subtitle {
          font-size: 95%;
          text-align: center;
          color: #828282;
          line-height: 1.2rem;
          word-spacing: 1px;
          margin: .5rem 1.5rem 2rem 1.5rem;
        }
      }
    }
  }
</style>
