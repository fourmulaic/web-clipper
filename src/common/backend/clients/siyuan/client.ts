import { CreateDocumentRequest } from './../../services/interface';
import { IExtendRequestHelper } from '@/service/common/request';
import { RequestHelper } from '@/service/request/common/request';
import { ISiyuanClientOptions } from './types';

export class SiYuanClient {
  private options: ISiyuanClientOptions;
  private request: IExtendRequestHelper;

  constructor(options: ISiyuanClientOptions) {
    this.options = options;
    this.request = new RequestHelper({
      baseURL: 'http://127.0.0.1:6806',
      request: this.options.request,
    });
  }

  listNotebooks = async (): Promise<string[]> => {
    const res = await this.request.post<{ data: { files: string[] } }>(`/api/notebook/ls`, {
      data: {},
    });
    return res.data.files.map(p => p.split('/')[p.split('/').length - 1]);
  };

  createNote = async (data: CreateDocumentRequest) => {
    await this.request.post<{ data: { files: string[] } }>(`/api/filetree/createDocWithMd`, {
      data: {
        notebook: data.repositoryId,
        path: `${data.title}.sy`,
        markdown: data.content,
      },
    });
  };
}
