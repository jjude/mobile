import React, { Component } from 'react';
import {View, Image, Text, TouchableHighlight, Platform} from 'react-native';

import GlobalStyles from "../Styles"
import SectionedTableCell from "./SectionedTableCell"

import Icon from 'react-native-vector-icons/Ionicons';

export default class SectionedAccessoryTableCell extends SectionedTableCell {

  rules() {
    var rules = super.rules().concat([
      GlobalStyles.styles().view,
      GlobalStyles.styles().flexContainer,
      ...GlobalStyles.stylesForKey("sectionedAccessoryTableCell")
    ]);
    return rules;
  }

  onPress = () => {
    this.props.onPress();
    this.forceUpdate();
  }

  onLongPress = () => {
    if(this.props.onLongPress) {
      this.props.onLongPress();
    }
  }

  render() {
    var checkmarkName = Platform.OS == "android" ? "md-checkbox" : "ios-checkmark-circle";
    var iconName = this.props.iconName ? this.props.iconName : ((this.props.selected && this.props.selected()) ? checkmarkName : null);

    var iconStyles = {
      width: 30,
      maxWidth: 30,
    }

    var left = this.props.leftAlignIcon;
    var iconSize = left ? 25: 30;
    var color = left ? GlobalStyles.constants().mainTextColor : GlobalStyles.constants().mainTintColor;


    if(Platform.OS == "android") { iconSize -= 5; }

    if(this.props.color) {
      color = this.props.color;
    }

    var icon = (
      <View key={0} style={iconStyles}>
        <Icon name={iconName} size={iconSize} color={color} />
      </View>
    )

    if(!iconName) {
      icon = null;
    }

    var textStyles = [GlobalStyles.styles().sectionedAccessoryTableCellLabel];

    if(this.props.bold || (this.props.selected && this.props.selected())) {
      textStyles.push(GlobalStyles.styles().bold)
    }
    if(this.props.tinted) {
      textStyles.push({color: GlobalStyles.constants().mainTintColor})
    }
    if(this.props.dimmed) {
      textStyles.push({color: GlobalStyles.constants().mainDimColor})
    }
    if(this.props.color) {
      textStyles.push({color: this.props.color})
    }

    var textWrapper = (<Text key={1} style={textStyles}>{this.props.text}</Text>);

    var containerStyles = {
      flex: 1,
      justifyContent: left ? 'flex-start' : 'space-between',
      flexDirection: 'row',
      alignItems: 'center'
    }

    return (
      <TouchableHighlight underlayColor={GlobalStyles.constants().plainCellBorderColor} style={this.rules()} onPress={this.onPress} onLongPress={this.onLongPress}>
        <View style={containerStyles}>
        {
          this.props.leftAlignIcon
          ? [icon, textWrapper]
          : [textWrapper, icon]
        }
        </View>
      </TouchableHighlight>
    )
  }
}
