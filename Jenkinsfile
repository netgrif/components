pipeline {
  agent any
  tools {
    nodejs 'localNodeJS'
  }
  stages {

    stage('Install') {
      steps {
        sh 'npm install'
      }
    }

    stage('Tests') {
      parallel {
        stage('Unit Test') {
          steps {
            sh 'npm run ng test netgrif-application-engine'
          }
        }

        stage('Lint') {
          steps {
            sh 'npm run ng lint netgrif-application-engine'
          }
        }

        stage('Sonar') {
            steps {
                echo 'Sonar'

            }
        }
      }
    }

    stage('Build') {
      steps {
        sh 'npm run nae:build'
      }
    }

    stage('Doc') {
      steps {
        sh 'npm run nae:doc'
      }
    }

    stage('ZIP') {
      steps {
        zip(archive: true, zipFile: 'nae-build.zip', dir: './dist/netgrif-application-engine')
      }
    }

  }

  post {
    always {
      junit testResults: '**/coverage/netgrif-application-engine/**/JUNITX-test-report.xml',
        allowEmptyResults: false,
        healthScaleFactor: 1.0
      archiveArtifacts artifacts: './dist/netgrif-application-engine/nae-build.zip', fingerprint: true
    }
  }
}
