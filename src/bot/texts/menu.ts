export class MenuText {
  public value(): string {
    return [
      'Доступные команды бота:\n',
      '📋 /start - показать меню',
      '🎯 /prediction - сделать прогноз',
      '⚪️ /predictions - ваши прогнозы',
      '🏆 /tournament - информация о турнире(таблица, игры)',
      '🎖 /rating - рейтинг прогнозистов',
      '📖 /rules - правила турнира прогнозов',
    ].join('\n\n');
  }
}
