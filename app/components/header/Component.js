import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

// Components
import Nav from 'reactstrap/lib/Nav';
import Navbar from 'reactstrap/lib/Navbar';
import Button from 'reactstrap/lib/Button';
import NavbarBrand from 'reactstrap/lib/NavbarBrand';
import NavItem from 'reactstrap/lib/NavItem';
import NavLink from 'reactstrap/lib/NavLink';
import Collapse from 'reactstrap/lib/Collapse';
import ButtonDropdown from 'reactstrap/lib/ButtonDropdown';
import DropdownToggle from 'reactstrap/lib/DropdownToggle';

import { NAMES_TO_PATHS, curStep, rootPath } from '../../views/app/steps';

// i18n
import t from '../../i18n/i18n';
import stepMsg from '../../i18n/messages/steps';

// CSS
import CSSModules from 'react-css-modules';
import styles from './styles.scss';

import logo from '../../images/logo.png';

@connect(mapStateToProps, {})
@CSSModules(styles)

export default class extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);

    this.state = {
      isOpen: false,
      isMenuOpen: false
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
      isMenuOpen: false
    });
  }

  toggleMenu() {
    this.setState({
      isMenuOpen: !this.state.isMenuOpen,
      isOpen: false
    });
  }

  renderMenu(stepIndex) {
    let bpoom = this.props.bpoom;
    return this.props.availableSteps.map((name, index) => {
      let text = t({ ...stepMsg.step_with_number, values: { index: index + 1, name: t(stepMsg[name]) }});
      let to = NAMES_TO_PATHS.get(name).replace(':uuid', bpoom.uuid);

      return (
        <NavItem key={'' + index}>
          {
            index <= this.props.maxStepIndex
              ? <NavLink styleName={index == stepIndex ? 'current' : ''} tag={Link} to={to}>{text}</NavLink>
              : <span styleName="disabled-link" className="nav-link disabled">{text}</span>
          }
        </NavItem>
      );
    });
  }

  render() {
    let step = curStep(this.props);
    let stepText = step.found
      ? t({ ...stepMsg.step_with_number, values: { index: step.index + 1, name: t(stepMsg[step.name]) }}) : '';
    let root = rootPath(this.props);

    return (
      <header>
        <Navbar light toggleable>
          <Button color="primary" styleName="toggler" className="navbar-toggler navbar-toggler-right" onClick={this.toggleMenu}>
            <span styleName="icon"></span>
          </Button>
          {
            this.props.availableSteps.length
              ? <Nav styleName="mobile-nav" className="navbar-toggler" navbar>
                  <NavItem>
                    <ButtonDropdown styleName="nav-button" isOpen={this.state.isOpen} toggle={this.toggle}>
                      <DropdownToggle outline color="primary" caret>{stepText}</DropdownToggle>
                    </ButtonDropdown>
                  </NavItem>
                </Nav>
              : ''
          }
          <span>
            <NavbarBrand styleName="nav-brand" tag={Link} to={root}>
              <img src={logo} />
            </NavbarBrand>
          </span>
          <div styleName="mobile-menu">
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav navbar>
                {this.renderMenu(step.index)}
              </Nav>
            </Collapse>
          </div>
          <div styleName="mobile-menu">
            <Collapse isOpen={this.state.isMenuOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink tag={Link} to="/" className="nav-link">Français</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} to="/" className="nav-link">Babypoom, c'est quoi ?</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} to="/" className="nav-link">Informations légales</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} to="/" className="nav-link">Partager votre avis</NavLink>
                </NavItem>
              </Nav>
            </Collapse>
          </div>
        </Navbar>
      </header>
    )
  }
}

function mapStateToProps(state) {
  const { app: { bpoom, currentStep, availableSteps, maxStepIndex } } = state;
  return { bpoom, currentStep, availableSteps, maxStepIndex };
}

