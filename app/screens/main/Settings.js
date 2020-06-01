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
import { View, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { toggleSubscription } from "@actions";
import { Label, Container, Switch, Loader } from "@components";
import { color, vw } from "@styles";

class Settings extends React.Component {
  static navigationOptions = { title: "CONFIGURACIÓN" };

  render() {
    return (
      <Container>
        <View style={styles.container}>
          <View style={[styles.settingTag, { marginBottom: vw * 8 }]}>
            <Label style={styles.label}>Activar alertas</Label>
            <Switch
              value={this.props.topic.news}
              {...switchStyle}
              onValueChange={(val) =>
                this.props.toggleSubscription("news", val)
              }
            />
          </View>

          <View style={styles.settingTag}>
            <Label style={styles.label}>Ciudad de México (México)</Label>
            <Switch
              value={this.props.topic.earthquake_mx_cdmx}
              {...switchStyle}
              onValueChange={(val) =>
                this.props.toggleSubscription("earthquake_mx_cdmx", val)
              }
            />
          </View>

          <View style={styles.settingTag}>
            <Label style={styles.label}>Santiago (Chile)</Label>
            <Switch
              value={this.props.topic.earthquake_cl_santiago}
              {...switchStyle}
              disable={true}
              onValueChange={(val) =>
                this.props.toggleSubscription("earthquake_cl_santiago", val)
              }
            />
          </View>
        </View>
        <Loader fullScreen visible={this.props.loading} />
      </Container>
    );
  }
}

const mapStateToProps = ({ FirebaseReducer }) => {
  return ({ loading, topic } = FirebaseReducer);
};

export default connect(mapStateToProps, { toggleSubscription })(Settings);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: vw * 2,
  },
  settingTag: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: color.white,
    borderRadius: 10,
    padding: vw * 5,
    marginVertical: vw * 2,
  },
  label: {
    fontSize: vw * 4,
  },
});

const switchStyle = {
  circleSize: 30,
  circleBorderWidth: 1.5,
  switchWidthMultiplier: 1.7,
};
