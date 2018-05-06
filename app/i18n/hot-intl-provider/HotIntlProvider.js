import React, { Component } from 'react';
import { IntlProvider } from 'react-intl';
import { connect } from 'react-redux';


class HotIntlProvider extends Component {
  render() {
    const { locale, allMessages } = this.props;
    const props = { locale, messages: allMessages[locale] };

    return (
      <IntlProvider {...props}>
        {this.props.children}
      </IntlProvider>
    );
  }
}

function mapStateToProps(state) {
  const { i18n: { locale } } = state;
  return {
    locale
  };
}

HotIntlProvider = connect(mapStateToProps, {

})(HotIntlProvider);

export default HotIntlProvider;