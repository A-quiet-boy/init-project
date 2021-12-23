/*
 * @Author: your name
 * @Date: 2021-12-04 19:07:12
 * @LastEditTime: 2021-12-20 10:51:27
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /zhujiayun-website-manage/src/components/UploadXls/index.tsx
 */
import { message, Button } from 'antd'
import * as antd from 'antd'
import { RcFile, UploadProps } from 'antd/lib/upload'
import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react'

interface UploadXlsProps extends UploadProps {
	ref: any
}
const Upload: any = antd.Upload
function UploadXls({ onChange }: UploadXlsProps, ref: any) {
	const [fileList, setfileList] = useState<any[]>([])
	const UploadXls = useRef(null)
	//图片上传
	const beforeUpload = (file: RcFile): Promise<any> => {
		return new Promise(async (resolve, reject) => {
			const fileNameArr = file.name.split(".")
			const fileType = fileNameArr[fileNameArr.length - 1]
			const isXls = fileType === 'xls'
			const isXlsx = fileType === 'xlsx'
			if (!isXls && !isXlsx) {
				message.error('只能上传EXCEL文件!')

				setfileList([])
			}
			const isLt10M = file.size / 1024 / 1024 < 10
			if (!isLt10M) {
				message.error('文件大小最大为10M!')

				setfileList([])
			}
			if ((isXls || isXlsx) && isLt10M) {
				setfileList([file])
			}
			resolve((isXls || isXlsx) && isLt10M)
		})
	}
	const handleChange = ({ file }: any) => {
		if (file.status === "error") {
			message.error("上传出错");
		}
		if (file.status === "done") {
			if (fileList.length > 0) {
				onChange && onChange(fileList[0])
			}
			return
		}
	}
	const handleRemoveFile = () => {
		setfileList([])
	}
	useImperativeHandle(
		ref,
		() => ({
			handleRemoveFile: () => {
				handleRemoveFile()
			}
		}),
	)
	return (
		<Upload
			method={'get'}
			onChange={handleChange}
			beforeUpload={beforeUpload}
			onRemove={handleRemoveFile}
			fileList={fileList}
		>
			{fileList.length == 0 ? (
				<Button type="primary">上传文件</Button>
			) : null}
		</Upload>
	)
}

export default forwardRef(UploadXls)