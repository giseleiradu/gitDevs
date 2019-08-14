import React, { Component } from "react";
import { FlatList, StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";
import { Navigation } from 'react-native-navigation';


// import Footer from "../components/Footer";
import baseURL from '../../helpers/constants';
import logo1 from "../../assets/logo1.png";
import myAvatar from "../../assets/myAvatar.png";




export default class DevsScreen extends Component {
	state = {
		devs: [],
		user: {
			uname: "Vera"
		}
	};
	async fetchDevs() {
		return fetch(`${baseURL}/users`)
			.then(response => response.json())
			.then(responseJson => {
				return responseJson;
			})
			.catch(error => {
				console.error(error);
			});
	}

	async componentWillMount() {
		try {
			const devz = await this.fetchDevs();
			this.setState({ devs: devz });
		} catch (error) {
			console.log(error);
		}
	}
	render() {
		const { devs, user } = this.state;
		return (
			<View style={styles.container}>
				<View style={styles.main}>
					<View style={{ flexDirection: "row" }}>
						<Image source={logo1} />
						<View style={{ justifyContent: "space-between" }}>
							<TouchableOpacity onPress={()=>this.moveToAddNewCustomer()}>
								<Image style={styles.avatar} source={myAvatar} />
							</TouchableOpacity>
							{/* <Image source={myAvatar} style={styles.avatar} /> */}
							<Text style={{ textAlign: "right", marginRight: "25%", color:'#2699FB' }}>
								{" "}
								@{user.uname}
							</Text>
						</View>
					</View>

					<FlatList
						style={{ marginTop: "17%" }}
						data={devs}
						renderItem={({ item }) => (
							<View style={styles.item} key={item.login}>
								<Image
									style={styles.profile}
									source={{
										uri: item.avatar_url
									}}
								/>
								<View style={styles.namesLocation}>
									<Text style={{ color: "#2699FB" }}>{item.login}</Text>
									<Text style={{ color: "#2699FB" }}>{item.type}</Text>
									<Text style={{ color: "#2699FB" }}>{item.location}</Text>
								</View>
							</View>
						)}
					/>
				</View>
				{/* <Footer screenName='Devs'/> */}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	main: {
		marginTop: "20%"
	},
	avatar: {
		width: 50,
		height: 50,
		borderRadius: "20%",
		marginLeft: "60%",
		marginTop: "5%",
		textAlign: "right"
	},

	container: {
		flex: 1,
		backgroundColor: "#fcfcfc",
		marginLeft: "5%"
	},
	item: {
		flexDirection: "row",
		backgroundColor: "#F1F9FF",
		paddingBottom: "1%",
		width: "90%",
		borderBottomWidth: 1,
		borderBottomColor: "#2699FB"
	},
	profile: {
		width: 50,
		height: 50,
		borderRadius: 25,
		margin: "5%"
	},
	namesLocation: {
		marginTop: "6%",
		justifyContent: "space-between",
		color: "#2699FB"
	}
});
