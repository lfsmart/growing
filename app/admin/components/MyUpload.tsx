'use client'
import React, { FC, useState, type ChangeEventHandler }  from 'react';
import { Upload, message, type GetProp, type UploadProps  } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import ImgCrop from 'antd-img-crop';
import Image from 'next/image';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const beforeUpload = (file: FileType) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
};


type Props = {
  name?: UploadProps['name'];
  onChange?: ChangeEventHandler; // 表单事件
  value?: string; // 表单设置的 value
}

const MyUpload: FC<Props> = ({ name='file', onChange, value=''}) => {
  
  const [ loading, setLoading] = useState(false);
  const [ imageUrl, setImageUrl] = useState<string>( value );

  const handleChange: UploadProps['onChange'] = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      setImageUrl( info.file.response.data );
      onChange?.( info.file.response.data );
    }
  };

  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  return (
    <>
      <ImgCrop rotationSlider>
        <Upload
          name={ name }
          action="/api/common/upload"
          listType="picture-card"
          showUploadList={ false }
          beforeUpload={ beforeUpload }
          onChange={ handleChange }
        >
          {imageUrl ? <Image src={imageUrl} alt="cover" style={{ width: '100%' }} width={100} height={100}/> : uploadButton}
        </Upload>
      </ImgCrop>
    </>
  );
};

export default MyUpload;