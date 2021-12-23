import React, { useState } from 'react';
import { Upload, message, Button } from 'antd';
import { RcFile, UploadProps } from 'antd/lib/upload';
import { GET_QI_NIU_TOKEN } from '~reducers/common';
import { dispatchWithPromise, uploadQiniuUrl } from '~utils/util'
const uploadImg = uploadQiniuUrl
import styles from './index.less'
interface UploadImageProps extends UploadProps {
	maxSize: number,//图片尺寸
	maxQuantity: number,//最多选择多少张图片
	multiple: boolean,
	value?: [],
	action?: string,
	onPDFChange?: ((arg0: string, arg1: string) => void) | undefined
	beforeUpload?: (file: RcFile) => boolean
	accept?: string//图片类型
}

const UploadImage = (props: UploadImageProps) => {
	const { maxSize, maxQuantity, value, onChange, action, onPDFChange } = props;
	const [token, setToken] = useState();
	const [qiniuDomain, setQiniuDomain] = useState();
	const [key, setKey] = useState<string>();
	const handleChange = (changeProcess: any) => {
		const { file, fileList } = changeProcess;
		if (file.status === "error") {
			message.error("上传出错");
		}
		if (file.status === "done") {
			onPDFChange && onPDFChange(qiniuDomain + file.response.key, file.name)
			return
		}
	}

	const beforeUpload = (file: RcFile, fileList: RcFile[]): Promise<any> => {
		return new Promise(async (resolve, reject) => {
			//自定义图片上传前事件
			if (props.beforeUpload && !props.beforeUpload(file)) {
				reject()
				return
			}
			if (file.type !== 'application/pdf') {
				message.error(`上传的文件仅支持pdf格式`);
				reject();
				return
			}
			if (file.size > maxSize * 1024) {
				message.error(`PDF大小不能大于${maxSize / 1024}M`);
				reject();
				return
			}

			const { token, qiniuDomain }: any = await dispatchWithPromise({ type: GET_QI_NIU_TOKEN });
			setToken(token);
			const ext = file.type.split('/')[1] || '';
			setKey(new Date().getTime() + '_' + `.${ext}`);
			setQiniuDomain(qiniuDomain);
			resolve(file);
		})
	}
	return (
		<div>
			<Upload
				accept={props.accept}
				onChange={handleChange}
				beforeUpload={beforeUpload}
				showUploadList={false}
				className={styles.upload}
				action={action || uploadImg}
				method="post"
				name="file"
				disabled={props.disabled}
				data={{
					token,
					key: key
				}}
			>
				{
					<div style={{ display: 'flex' }}>
						{
							value &&
							<div className={styles.pdf}>
								{/* <Icon type="picture" /> */}
								<span className={styles.value}>{value}</span>
							</div>
						}
						{
							!props.disabled &&
							<Button type='primary' style={{ marginLeft: "10px" }}>{value ? '重新上传' : "上传文件"}</Button>
						}
					</div>
				}
			</Upload>
		</div>
	)
}

UploadImage.defaultProps = {
	maxQuantity: 1,
	multiple: true,
	maxSize: 1024 * 4, //单位 kb
	accept: ".pdf"
}


export default UploadImage;