<template>
  <article class="profile">
    <ul class="profile-layout">
      <li class="profile__img_wrapper">
        <section class="profile__img">
          <img src="../assets/img/profile.jpeg" alt="">
        </section>
      </li>
      <li class="profile__content_wrapper">
        <section class="profile__content">
          <h2 class="profile__content-nickname">{{metaData.nickname}}</h2>
          <section class="profile__content-info">
            <ul>
              <li>
                <User/>
                {{metaData.name}}
              </li>
              <li>
                <Mail/>
                <a :href="`mailto:${metaData.mail}`">{{metaData.mail}}</a>
              </li>
              <li>
                <Map/>
                {{metaData.location}}
              </li>
            </ul>
          </section>
          <section class="profile__content-des">
            <p>{{metaData.description}}</p>
            <Tag :tagList="metaData.skills"/>
          </section>
          <section class="profile__content-contact">
            <ul>
              <li v-for="(link, key) of metaData.link">
                <a :href="link" target="_blank">
                  <Github v-if="key === 'github'"/>
                  <Hackerrank v-else-if="key === 'hackerrank'"/>
                  <Leetcode class="fw" v-else-if="key === 'leetcode'"/>
                  <Instagram v-else-if="key === 'instagram'"/>
                </a>
              </li>
            </ul>
          </section>
        </section>
      </li>
    </ul>
  </article>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import Github from '../assets/svg/github.svg'
  import Hackerrank from '../assets/svg/hackerrank.svg'
  import Instagram from '../assets/svg/instagram.svg'
  import Leetcode from '../assets/svg/leetcode.svg'
  import Mail from '../assets/svg/mail.svg'
  import Map from '../assets/svg/map.svg'
  import User from '../assets/svg/user.svg'
  import Tag from '~/components/Tag.vue'

  @Component({
    name: 'Profile',
    components: {
      User,
      Mail,
      Map,
      Github,
      Hackerrank,
      Leetcode,
      Instagram,
      Tag,
    },
  })
  export default class Profile extends Vue {
    @Prop() metaData!: any

    constructor() {
      super()
    }
  }

</script>

<style lang="scss" scoped>
  .profile {
    width: 100%;
    max-width: var(--width-size);
    margin: 8.5rem auto 0 auto;
    border: 1px solid var(--app-profile-border-color);
    border-radius: 10px;

    &-layout {
      display: flex;

      li {
        display: inline-block;

        &.profile__img_wrapper {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        &.profile__content_wrapper {
          flex: 2.5;
        }
      }
    }

    &__img {
      display: inline-block;
      text-align: center;
      width: 100%;

      img {
        border-radius: 50%;
        border: 1px solid var(--app-profile-border-color);
        width: 60%;
      }
    }

    &__content {
      display: inline-block;
      margin-top: 10px;
      width: 100%;

      &-nickname {
        color: var(--app-font-color);
        font-family: Gugi;
        font-size: 3rem;
        margin-bottom: 1px;
      }

      &-info {
        font-family: Gugi;
        font-size: 0.7rem;
        color: var(--posting-info-font-color);

        ul > li {
          margin-right: 15px;

          svg {
            width: 1rem;
            margin-right: 3px;
            vertical-align: text-bottom;
          }

          a {
            color: inherit;
            padding-left: 2px;
          }
        }
      }

      &-des {
        p {
          font-size: 1.6rem;
          margin: 8px 0;
        }
      }

      &-contact {
        margin: 10px;
        float: right;

        ul {
          display: flex;

          li {
            width: 20px;
            margin-right: 10px;

            a {
              color: var(--app-font-color);
            }

            .fw {
              path {
                fill: var(--app-font-color);
              }
            }
          }
        }
      }
    }
  }

  @media all and (max-width: 500px) {
    .profile__img {
      width: 55%;
      margin-top: 10px;
    }

    .profile-layout {
      display: inline-block;

      .profile__content_wrapper {
        padding-left: 10px;
      }
    }
    .profile__content-info {
      ul {
        display: inline-block;

        li {
          margin-bottom: 5px;
        }
      }
    }
  }
</style>
