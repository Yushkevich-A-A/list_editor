import DrawWidget from './DrawWidget/DrawWidget';
import WidgetController from './WidgetController/WidgetController';
import WidgetError from './WidgetError/WidgetError';
import WidgetWindowConfirm from './WidgetWindowConfirm/WidgetWindowConfirm';

const wid = new DrawWidget(document.body);
const error = new WidgetError();
const confirm = new WidgetWindowConfirm();
new WidgetController(wid, error, confirm);
