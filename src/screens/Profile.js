import React, { Component } from "react";
import {
	Share,
	AsyncStorage,
	StyleSheet,
	Image,
	Button,
	View,
	Text,
	Platform
} from "react-native";
import firebase from "firebase";
import Icon from "react-native-vector-icons/Ionicons";
import * as WebBrowser from "expo-web-browser";

import logo1 from "../../assets/logo1.png";
import { TouchableOpacity } from "react-native-gesture-handler";


onShare = async (link, name) => {
	try {
		const result = await Share.share({
			message: `Checkout ${name} GitHub profile: \n\n${link}`
		});
	} catch (error) {
		alert(error.message);
	}
};
viewProfile = async link => {
	await WebBrowser.openBrowserAsync(link);
};

export default class ProfileScreen extends Component {
	
	render() {
		const item = this.props.navigation.getParam("item", () => {});
		return (
			<View style={styles.container}>
				<View style={styles.main}>
					<View>
						<Image source={logo1} />
					</View>

					<View style={{ 
						display: "flex", 
						flexDirection: "collumn-reverse" 
						}}>
						<Image
							source={{
								uri: item.avatarUrl
							}}
							style={styles.avatar}
						/>
						<Text
							style={{
								textAlign: "center",
								fontWeight: "bold",
								color: "#2699FB"
							}}
						>
							{" "}
							@{item.name}
						</Text>
						<Text style={{ textAlign: "center", color: "#2699FB" }}>
							{item.location}
						</Text>
						<View style={[styles.link, { position: "relative" }]}>
							<Icon
								name={Platform.OS === "ios" ? "ios-link" : "md-link"}
								style={{
									fontWeight: "bold",
									color: "#2699FB",
									marginRight: "2%"
								}}
								color="#ccc"
								size={17}
							/>
							<TouchableOpacity onPress={() => viewProfile(item.url)}>
								<Text style={{ color: "#2699FB", fontWeight: "bold" }}>
									View Account
								</Text>
							</TouchableOpacity>
						</View>
						<View style={{ flexDirection: "row" }}>
							<View style={styles.aboutDev}>
								<Text>{item.starredRepositories.totalCount} Stars</Text>
							</View>
							<View style={styles.aboutDev}>
								<Text>{item.repositories.totalCount} Repositories</Text>
							</View>
						</View>
						<Button
							title="Share"
							onPress={() => onShare(item.url, item.name)}
							style={{
								marginTop: 90,
								backgroundColor: "red"
							}}
						/>
					</View>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fcfcfc",
		marginLeft: "5%"
	},
	paragraph: {
		margin: 24,
		fontSize: 18,
		fontWeight: "bold",
		textAlign: "center",
		color: "#34495e"
	},
	avatar: {
		width: 50,
		height: 50,
		borderRadius: "20%",
		marginLeft: "45%",
		marginBottom: "2%"
	},
	main: {
		marginTop: "15%"
	},
	aboutDev: {
		width: "45%",
		color: "#2699FB",
		backgroundColor: "#f1f9ff",
		height: 80,
		marginRight: "5%",
		pasition: "relative"
	},
	link: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "center",
		marginTop: "10%"
	}
});
