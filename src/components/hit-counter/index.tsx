import React from 'react'
import styled from 'styled-components'

export const HitCounter: React.FC<{ url?: string, display?: boolean }> = ({ url, display }) => {
	const BASE_URL = `https://hits.seeyoufarm.com/api/count/incr/badge.svg`
	const targetUrl = encodeURIComponent(url || 'https://akasai.space')
	const bgColor = encodeURIComponent(`#191F23D6`)

	return (
		<HitCounterWrapper hide={display || false}>
			<img src={`${BASE_URL}?url=${targetUrl}&count_bg=${bgColor}&title_bg=${bgColor}&title=view&edge_flat=true`}
					 alt={''}/>
		</HitCounterWrapper>
	)
}

const HitCounterWrapper = styled.span<{ hide: boolean }>`
  display: ${(props) => props.hide ? 'none' : 'block'};
  text-align: right;

	> img {
		margin: 0;
	}
`
