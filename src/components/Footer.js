import React, { Component } from "react";
import {
	StyleSheet,
	View,
	Text
} from "react-native";

export default class Footer extends Component {
	
	render() {
		return (
			<View style={styles.footer}>
                <Text>{this.props.screenName}</Text>
                <Text>@Vera2019</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	footer: {
		color: "#007FEB",
		backgroundColor: "#fcfcfc",
        alignItems: "center",
	}
});
