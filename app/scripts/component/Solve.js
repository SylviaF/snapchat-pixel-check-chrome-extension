/*
* @Author: fangsimin
* @Date:   2018-04-13 16:21:23
* @Last Modified by:   fangsimin
* @Last Modified time: 2018-04-20 15:33:41
*/
'use strict';
import React from 'react';

export default class Solve extends React.Component {
	innerhtmlFormat(htm) {
		return {
			__html: htm
		};
	};
	render() {
		let data = this.props.data;
		console.log('solve: ', data);

		if (data && data instanceof Array) {
			return <div style={{
					margin: '5px 0',
					padding: '5px 10px',
					border: '1px solid #ddd',
					borderRadius: '5px'
				}}>
				<p>解决办法：</p>
				{data.map(item => {
					switch (item.type) {
						case 'code':
							return <pre className="language-javascript">
								<code className="language-javascript">{item.data}</code></pre>;
						default:
							return <p dangerouslySetInnerHTML={this.innerhtmlFormat(item.data)}></p>
					}
				})}
			</div>;
		} else {
			return '';
		}
	}
}