import { SendBasicOptions } from "node-telegram-bot-api";

export class WebAppButton {
  private text: string;
  private pageParam?: string;
  private webAppUrl: string;

  constructor(text: string, pageParam?: string) {
    this.text = text;
    this.pageParam = pageParam;
    this.webAppUrl = process.env.WEB_APP_URL!;
  }

  public asObject(): SendBasicOptions {
    const searchParams = this.pageParam ? `?page=${this.pageParam}` : '';
    const url = `${this.webAppUrl}${searchParams}`;

    return {
      reply_markup: {
        inline_keyboard: [
          [{
            text: this.text,
            web_app: { url },
          }],
        ],
      },
    };
  }
}
