import { HitCounter, MainBio, PostPreview } from '@components'
import { Post } from '@constant'
import React, { useMemo } from 'react'
import styled from 'styled-components'

interface Props {
  rawPost: Post[]
}

const Section = styled.section`
  min-height: calc(100vh - 15rem);
  max-width: var(--width-size);
  min-width: var(--app-min-width);
  width: 100%;
  margin: 0 auto 5rem auto;
  padding-top: 1.4rem;
`

export const PostListWrapper: React.FC<Props> = ({ rawPost }) => {
  const refinedPosts = useMemo(() => rawPost, [])

  return (
    <Section>
      <MainBio/>
      <HitCounter display={true}/>
      <hr/>
      {refinedPosts.map(({ node }) => <PostPreview key={node.id} node={node}/>)}
    </Section>
  )
}
/*
// const loadRef = useRef<HTMLDivElement>(null)
// let hasMore = true

// const handleObserver = (entities: any) => {
//   const target = entities[0]
//   if (target.isIntersecting) {
//     console.log('### 111111', 111111)
//     // setLoadMore(true)
//   }
// }

//Initialize the intersection observer API
// useEffect(() => {
//   const options = {
//     root: null,
//     rootMargin: '20px',
//     threshold: 1.0,
//   }
//   const observer = new IntersectionObserver(handleObserver, options)
//   if (loadRef.current) {
//     observer.observe(loadRef.current)
//   }
// }, [])

// const [category, selectCategory] = useCategory()
// const categories = useMemo(() =>
//     Array.from(new Set(rawPost.map(({ node }) => node.frontmatter.category))),
//   [])// .sort((a, b) => a < b ? -1 : a > b ? 1 : 0)
// <Category categories={categories} category={category} selectCategory={selectCategory}/>
*/
