import * as api from "./api";
import { utils, dict, compute } from "@fast-crud/fast-crud";
export default function ({ expose }) {
  const pageRequest = async (query) => {
    return await api.GetList(query);
  };
  const editRequest = async ({ form, row }) => {
    form.id = row.id;
    return await api.UpdateObj(form);
  };
  const delRequest = async ({ row }) => {
    return await api.DelObj(row.id);
  };

  const addRequest = async ({ form }) => {
    return await api.AddObj(form);
  };
  return {
    crudOptions: {
      request: {
        pageRequest,
        addRequest,
        editRequest,
        delRequest
      },
      columns: {
        id: {
          title: "ID",
          key: "id",
          type: "number",
          column: {
            width: 50
          },
          form: {
            show: false
          }
        },
        title: {
          title: "标题",
          type: ["text", "colspan"],
          column: {
            width: 400
          }
        },
        text: {
          title: "摘要",
          type: ["textarea", "colspan"],
          viewForm: {
            component: {
              name: null,
              render(h, scope) {
                return <div>{scope.value}</div>;
              }
            }
          }
        },
        disabled: {
          title: "禁用启用",
          search: { show: false },
          type: ["dict-switch", "colspan"],
          dict: dict({
            data: [
              { value: true, label: "禁用" },
              { value: false, label: "启用" }
            ]
          })
        },
        change: {
          title: "切换编辑器",
          type: "dict-radio",
          disabled: true,
          dict: dict({
            data: [
              { value: "quill", label: "Quill" },
              { value: "wang", label: "WangEditor" }
            ]
          })
        },
        content: {
          title: "内容",
          column: {
            show: false
          },
          type: ["textarea", "colspan"],
          form: {
            show: compute(({ form }) => {
              return form.change === "quill";
            }),
            component: {
              disabled: compute(({ form }) => {
                return form.disable;
              }),
              uploader: {
                type: "form" // 上传后端类型【cos,aliyun,oss,form】
              },
              on: {
                "text-change": (event) => {
                  console.log("text-change:", event);
                }
              }
            }
          }
        },
        content_wang: {
          title: "内容",
          column: {
            width: 300,
            show: false
          },
          type: ["editor-wang", "colspan"], // 富文本图片上传依赖file-uploader，请先配置好file-uploader
          disabled: true, // 设置true可以在行展示中隐藏
          form: {
            show: compute(({ form }) => {
              return form.change === "wang";
            }),
            component: {
              disabled: compute(({ form }) => {
                return form.disable;
              }),
              id: "1", // 当同一个页面有多个editor时，需要配置不同的id
              config: {
                // withCredentials: false,
                // uploadImgServer: 'http://localhost:7070/api/upload/form/upload'
              }
            }
          }
        }
      }
    }
  };
}
