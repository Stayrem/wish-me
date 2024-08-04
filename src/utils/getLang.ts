export const getLang = () => {
	const lang = Telegram.WebApp.initDataUnsafe.user?.language_code || '';
	return lang === 'ru' ? 'ru-RU' : 'en-US'
}
