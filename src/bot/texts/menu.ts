export class MenuText {
  public value(): string {
    return [
      'Доступные команды бота:\n',
      '📋 /start или <b>меню</b> - показать меню',
      '🎯 /prediction или <b>прогноз</b> - сделать прогноз',
      '⚪️ /predictions или <b>прогнозы</b> - ваши прогнозы',
      '🏆 /tournament или <b>турнир</b> - информация о турнире(таблица, игры)',
      '🎖 /rating или <b>рейтинг</b> - рейтинг прогнозистов',
      '📖 /rules или <b>правила</b> - правила турнира прогнозов',
    ].join('\n\n');
  }
}
