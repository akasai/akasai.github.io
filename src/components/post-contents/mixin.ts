import { css } from 'styled-components'

export const contentText = css`
  /* 제목 */
  h2 {
    font-size: 2.2rem;
    padding: 1.5rem 0;
    font-weight: bold;
    margin: 1rem 0;
  }

  h3 {
    font-size: 1.7rem;
    margin-top: 1rem;
    padding: 2rem 0 0.8rem;
    font-weight: bold;
  }

  /* text */
  p {
    font-weight: 300;
    margin: auto;
  }

  :not(ol) > p, :not(ul) > p {
    width: 100%;
  }

  a {
    font-weight: bold;
  }

  ul {
    display: inline-block; 
  }
  
  /* list */
  ol, ul {
    padding: 5px 0;
    width: 94%;

    > li {
      margin: 0 5px 10px 0;
    }
  }

  /* 이미지 */
  p > .gatsby-resp-image-wrapper {
    margin: 15px 0;
  }

  /* 강조색 */
  .em {
    font-weight: bold;

    &.red {
      color: red;
    }
  }

  /* 출처 */
  .reference {
    font-size: 1.7rem;
    display: inline-block;
    margin: 0;
    //padding-bottom: 30px;

    > p {
      margin: 5px 0;
    }

    * {
      color: var(--reference-font-color) !important;
      transition: color 0.15s ease-in-out;

      &:hover {
        color: var(--reference-hover-font-color) !important;
        transition: color 0.15s ease-in-out;
      }
    }

    a:before {
      content: '🔗';
      margin-right: 5px;
    }
  }
`
