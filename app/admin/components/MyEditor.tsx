'use client'
import '@wangeditor/editor/dist/css/style.css' // 引入 css

import React, { useState, useEffect, FC, type ChangeEventHandler } from 'react'
import { Editor, Toolbar } from '@wangeditor/editor-for-react'
import { IDomEditor, IEditorConfig, IToolbarConfig } from '@wangeditor/editor'

type Props = {
  value?: string;
  onChange?: (val: string) => void;
}

const MyEditor: FC<Props> = ({ value, onChange }) => {
  // editor 实例
  const [editor, setEditor] = useState<IDomEditor | null>(null) // TS 语法

  // 编辑器内容
  const [html, setHtml] = useState( value )

  // 模拟 ajax 请求，异步设置 html
  // useEffect(() => {
  //   setTimeout(() => {
  //     setHtml('<p>hello world</p>')
  //   }, 1500)
  // }, [])

  // 工具栏配置
  const toolbarConfig: Partial<IToolbarConfig> = {} 

  // 编辑器配置
  const editorConfig: Partial<IEditorConfig> = {
    placeholder: '请输入内容...',
    MENU_CONF: {
      uploadImage: {
        server: '/api/common/wang_editor/upload',
        fieldName: 'file',
      }
    }
  }

  // 及时销毁 editor ，重要！
  useEffect(() => {
    return () => {
      if (editor == null) return
      editor.destroy()
      setEditor(null)
    }
  }, [editor])


  const handleChange = (edt: IDomEditor) => {
    setHtml( edt!.getHtml() );
    onChange?.( edt!.getHtml() );
  }

  return (
    <>
      <div style={{ border: '1px solid #ccc', zIndex: 100 }}>
        <Toolbar 
          editor={editor} 
          defaultConfig={toolbarConfig} 
          mode='default' 
          style={{ borderBottom: '1px solid #ccc' }} 
        />
        <Editor 
          defaultConfig={editorConfig} 
          value={html} 
          onCreated={setEditor} 
          onChange={ (edt) => handleChange(edt) } 
          mode='default' 
          style={{ height: '500px', overflowY: 'hidden' }} 
        />
      </div>
    </>
  )
}

export default MyEditor
