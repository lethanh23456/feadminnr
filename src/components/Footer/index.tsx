import { tenTruongVietTatTiengAnh } from '@/services/base/constant';
import { DefaultFooter } from '@ant-design/pro-layout';

export default () => {
	return (
		<DefaultFooter
			copyright={`2024 ${tenTruongVietTatTiengAnh?.toUpperCase() ?? ''} - ${APP_CONFIG_APP_VERSION}`}
			links={[]}
			style={{ width: '100%' }}
		/>
	);
};
