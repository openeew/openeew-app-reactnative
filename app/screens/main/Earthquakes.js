//=============================================================================
// Copyright Grillo Holdings Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
// =============================================================================

import React from "react";
import { View, StyleSheet, FlatList, Image } from "react-native";
import { color } from "@styles";
import { connect } from "react-redux";
import { getHistoricalEarthquakes } from "@actions";
import { Label, Loader, EmptyPlaceholder } from "@components";
import moment from "moment";

const intensityTag = {
  Débil: "I",
  Moderado: "II",
  Fuerte: "III",
  "Muy Fuerte": "IV",
  Severo: "V",
};
const notSubscribedMsg =
  "Suscríbete a la notificación de terremoto para ver la historia de los terremotos.";
const logo = "@assets/logo.png";

class Earthquakes extends React.Component {
  static navigationOptions = {
    title: "Intensidades registradas por la Red Grillo",
  };

  keyExtractor = (item) => JSON.stringify(item.data().report_time);

  componentDidMount() {
    this.props.getHistoricalEarthquakes();
  }

  getCountry(topic) {
    if (topic === "earthquake_mx_cdmx") return "México";
    else if (topic === "earthquake_cl_santiago") {
      return "Chile";
    }
  }

  getInfo(data) {
    let region = data.region;
    if (topic.earthquake_cl_santiago && topic.earthquake_mx_cdmx) {
      region = data.region + ", " + this.getCountry(data.topic_name);
    }
    return `${region} • ${moment(data.report_time).format(
      "YYYY-MM-DD • HH.mm.ss"
    )}`;
  }

  renderItem({ item }) {
    let _item = item.data();
    if (this.props.topic[_item.topic_name]) {
      return (
        <View style={styles.listItem}>
          <View
            style={[
              styles.intensityStyle,
              { backgroundColor: _item.predicted_intensity_rgb },
            ]}
          >
            {intensityTag[_item.predicted_intensity_tag] ? (
              <Label fontSize={5} style={styles.intensityValueStyle}>
                {intensityTag[_item.predicted_intensity_tag]}
              </Label>
            ) : (
              <Image style={styles.logoImageStyle} source={require(logo)} />
            )}
          </View>
          <View style={styles.infoContainerStyle}>
            <Label fontSize={4} style={styles.title}>
              {_item.predicted_intensity_tag}
            </Label>
            <Label style={styles.location}>{this.getInfo(_item)}</Label>
          </View>
        </View>
      );
    }
  }

  isSubscribeToAnyTopic() {
    if (topic.earthquake_cl_santiago || topic.earthquake_mx_cdmx) {
      return false;
    } else return true;
  }

  render() {
    if (this.props.loading || this.props.historicalEarthquakeLoading) {
      return <Loader />;
    } else if (this.isSubscribeToAnyTopic()) {
      return (
        <EmptyPlaceholder
          iconName="md-notifications"
          link={{
            linkText: "Suscríbete ahora",
            onPress: () => this.props.navigation.navigate("Configuración"),
          }}
          msg={notSubscribedMsg}
        />
      );
    }
    return (
      <FlatList
        data={this.props.historicalEarthquake}
        extraData={this.props.topic}
        renderItem={this.renderItem.bind(this)}
        keyExtractor={this.keyExtractor}
        showsVerticalScrollIndicator={false}
      />
    );
  }
}

const mapStateToProps = ({ FirebaseReducer }) => {
  console.log(FirebaseReducer);
  return ({
    loading,
    historicalEarthquakeLoading,
    topic,
    historicalEarthquake,
  } = FirebaseReducer);
};

export default connect(mapStateToProps, { getHistoricalEarthquakes })(
  Earthquakes
);

const styles = StyleSheet.create({
  listItem: {
    flex: 1,
    flexDirection: "row",
    marginVertical: 5,
    padding: 20,
    paddingVertical: 15,
    backgroundColor: color.lightGray,
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
  },
  intensityStyle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "green",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  intensityValueStyle: {
    color: color.white,
  },
  infoContainerStyle: {
    flex: 1,
  },
  logoImageStyle: {
    width: 35,
    height: 30,
    resizeMode: "stretch",
  },
});
