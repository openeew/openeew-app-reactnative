import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import { toggleSubscription } from '@actions';
import { Container, Label, Loader, Switch } from '@components';
import { color } from '@styles';
import styles, { switchStyle } from './styles';

class PageThird extends React.Component {

  componentDidMount() {
    this.props.toggleSubscription('news', true);
  }

  render() {
    return (
      <Container>
        <View style={styles.container}>
          <LinearGradient
            colors={[color.gradientBackground1, color.gradientBackground2]}
            style={styles.gradient}
          />
          <View>
            <Label
              style={styles.labelStyle}
              fontSize={8}
            >
              Alertas personalizadas
            </Label>
            <Label
              style={styles.labelStyle}
              fontSize={4}
            >
              Selecciona tu ciudad. Te avisaremos cuando tengamos más localidades disponibles.
            </Label>
          </View>
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <View style={styles.switchContainer}>
              <Label style={styles.switchLabel}>Ciudad de México (México)</Label>
              <Switch
                value={this.props.topic.earthquake_mx_cdmx}
                {...switchStyle}
                onValueChange={(val) => this.props.toggleSubscription('earthquake_mx_cdmx', val)}
              />
            </View>
            <View style={styles.switchContainer}>
              <Label style={styles.switchLabel}>Santiago (Chile)</Label>
              <Switch
                value={this.props.topic.earthquake_cl_santiago}
                {...switchStyle}
                onValueChange={(val) => this.props.toggleSubscription('earthquake_cl_santiago', val)}
              />
            </View>
          </View>
        </View>
      </Container>
    );
  }
}

const mapStateToProps = ({ FirebaseReducer }) => {
  return { topic } = FirebaseReducer;
};

export default connect(mapStateToProps, { toggleSubscription })(PageThird);
