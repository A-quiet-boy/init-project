import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { Redirect } from 'react-router';
import apiList from '~/apis';
import { SAVE_PERMISSIONS } from '~reducers/common';


function PrivateComponent(props: any) {
	const dispatch = useDispatch()
	useEffect(() => {
		const { loginInfo, permissions } = props;
		if (!loginInfo) return;
		if (!permissions || !permissions.length) {
			getPermissions()
		}
	}, [])
	async function getPermissions() {
		let res = await apiList.getPermissions()
		dispatch({ type: SAVE_PERMISSIONS, data: res.data.list })
	}
	return (
		props.loginInfo ? props.children : <Redirect to="/login" />
	)

}

export default connect((state: any) => {
	const { loginInfo, permissions } = state.common;
	return {
		loginInfo,
		permissions
	}
})(PrivateComponent)