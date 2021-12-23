/*
 * @Author: your name
 * @Date: 2021-12-04 19:07:12
 * @LastEditTime: 2021-12-20 10:45:02
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /zhujiayun-website-manage/src/components/Permission/index.tsx
 */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

interface PermissionProps {
	name: string
	children: JSX.Element
}
function Permission(props: PermissionProps) {
	const [visible, setVisible] = useState(false);
	const permissions: any[] = useSelector((state: any) => state.common.permissions)
	useEffect(() => {
		for (let i in permissions) {
			if (permissions[i].key == props.name) {
				setVisible(true)
			}
		}
		return
	}, [permissions])

	return visible ? props.children : null
}
export default Permission